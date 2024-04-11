import json
from pdb import set_trace

import numpy as np
import pytest
from scipy.spatial import Voronoi
from shapely import Polygon, from_geojson, unary_union

from backend.voronoi.geometry import (
    check_point_is_within,
    get_bounding_segments,
    get_intersection_with_bounding_box,
    gradient,
    match_point_features_to_polygons,
)
from backend.voronoi.models import (
    BoundingBox,
    Edges,
    Intersection,
    IntersectionException,
)
from backend.voronoi.voronoi import (
    _load_geojson_file,
    get_line_segments_from_voronoi,
    get_polygons_from_voronoi,
    load_mask_geojson,
    load_points_and_features_from_geojson,
)


@pytest.fixture
def mock_points():
    return [[0, 0], [1, 1], [2, 3], [1, 2]]


@pytest.fixture
def mock_points_as_features(mock_points):
    return [
        {"type": "Feature", "properties": {}, "geometry": {"type": "Point", "coordinates": point}}
        for point in mock_points
    ]


@pytest.fixture
def mock_voronoi(mock_points):
    points = np.array(mock_points)
    return Voronoi(points)


@pytest.fixture
def mock_bounding_box():
    return BoundingBox(xmin=-10, xmax=10, ymin=-10, ymax=10)


@pytest.fixture
def mock_bounding_box_intersections():
    return {
        "top": [[-6.0, 10]],
        "right": [[10, -2.25], [10, -9.0]],
        "bottom": [],
        "left": [[-10, 6.25]],
    }


@pytest.fixture
def mock_expected_polygons():
    _polygons = [
        {
            "type": "Polygon",
            "coordinates": [[[-0.5, 1.5], [2.5, 1.5], [10.0, -2.25], [10.0, -9.0], [-0.5, 1.5]]],
        },
        {
            "type": "Polygon",
            "coordinates": [
                [[2.5, 1.5], [-0.5, 1.5], [-10.0, 6.25], [-10.0, 10.0], [-6.0, 10.0], [2.5, 1.5]]
            ],
        },
        {
            "type": "Polygon",
            "coordinates": [
                [[-0.5, 1.5], [10.0, -9.0], [10.0, -10.0], [-10.0, -10.0], [-10.0, 6.25], [-0.5, 1.5]]
            ],
        },
        {
            "type": "Polygon",
            "coordinates": [[[2.5, 1.5], [-6.0, 10.0], [10.0, 10.0], [10.0, -2.25], [2.5, 1.5]]],
        },
    ]

    return [from_geojson(json.dumps(_polygon)) for _polygon in _polygons]


@pytest.mark.parametrize(
    "point_a,point_b,expected_output",
    [
        ([1, 1], [2, 7], 6),
        ([2, 5], [-1, 1], 1.33),
    ],
)
def test_gradient(point_a, point_b, expected_output):
    m_grad = gradient(point_a=point_a, point_b=point_b)
    assert round(m_grad, 2) == expected_output


@pytest.mark.parametrize(
    "point_a,point_b,expected_output",
    [([1, 1], [2, 1], 0), ([1, 1], [1, 2], None)],
)
def test_gradient_h_v(point_a, point_b, expected_output):
    assert expected_output == gradient(point_a=point_a, point_b=point_b)


@pytest.mark.parametrize(
    "point_a,point_b,point_c,expected_output",
    [
        ([1, 1], [2, 2], [3, 3], True),
        ([2, 2], [1, 1], [3, 3], False),
    ],
)
def test_check_point_is_within(
    point_a: list[float], point_b: list[float], point_c: list[float], expected_output
):
    assert expected_output == check_point_is_within(point_a=point_a, point_b=point_b, point_c=point_c)


@pytest.mark.parametrize(
    "coordinates,bounding_box,expected_output",
    [
        (
            [[1, 0], [2, 2]],
            BoundingBox(xmin=0, xmax=5, ymin=0, ymax=5),
            Intersection(coordinates=(3.5, 5), edge=Edges.top),
        ),
        (
            [[0, 3], [1, 2]],
            BoundingBox(xmin=0, xmax=5, ymin=0, ymax=5),
            Intersection(coordinates=(3, 0), edge=Edges.bottom),
        ),
        (
            [[2, 3], [1, 2]],
            BoundingBox(xmin=0, xmax=5, ymin=0, ymax=5),
            Intersection(coordinates=(0, 1), edge=Edges.left),
        ),
        (
            [[3, 4], [4, 3]],
            BoundingBox(xmin=0, xmax=5, ymin=0, ymax=5),
            Intersection(coordinates=(5, 2), edge=Edges.right),
        ),
        (
            [[2, 3], [4, 3]],
            BoundingBox(xmin=0, xmax=5, ymin=0, ymax=5),
            Intersection(coordinates=(5, 3), edge=Edges.right),
        ),
        (
            [[4, 3], [2, 3]],
            BoundingBox(xmin=0, xmax=5, ymin=0, ymax=5),
            Intersection(coordinates=(0, 3), edge=Edges.left),
        ),
        (
            [[2, 3], [2, 4]],
            BoundingBox(xmin=0, xmax=5, ymin=0, ymax=5),
            Intersection(coordinates=(2, 5), edge=Edges.top),
        ),
        (
            [[4, 3], [4, 1]],
            BoundingBox(xmin=0, xmax=5, ymin=0, ymax=5),
            Intersection(coordinates=(4, 0), edge=Edges.bottom),
        ),
    ],
)
def test_get_intersection_with_bounding_box(
    coordinates: list[list[float]], bounding_box: BoundingBox, expected_output: Intersection
):
    assert expected_output == get_intersection_with_bounding_box(
        coordinates=coordinates, bounding_box=bounding_box
    )


@pytest.mark.parametrize(
    "coordinates,bounding_box",
    [
        (
            [[1, 0], [4, 4]],
            BoundingBox(xmin=0, xmax=2, ymin=0, ymax=2),
        ),
    ],
)
def test_get_intersection_with_bounding_box_exception(
    coordinates: list[list[float]],
    bounding_box: BoundingBox,
):
    with pytest.raises(IntersectionException) as exc_info:
        get_intersection_with_bounding_box(coordinates=coordinates, bounding_box=bounding_box)
        assert "No intersections" in exc_info


def test_get_line_segments_from_voronoi(mock_voronoi, mock_bounding_box):
    segments, bounding_box_intersections = get_line_segments_from_voronoi(mock_voronoi, mock_bounding_box)

    expected_segments = [
        [[-0.5, 1.5], [2.5, 1.5]],
        [[-0.5, 1.5], [10, -9.0]],
        [[-0.5, 1.5], [-10, 6.25]],
        [[2.5, 1.5], [-6.0, 10]],
        [[2.5, 1.5], [10, -2.25]],
    ]

    segments = [list([list(y) for y in x]) for x in segments]

    assert all(segment in expected_segments for segment in segments)
    assert len(segments) > 0  # Assuming at least one segment is created
    assert isinstance(segments, list)
    assert isinstance(bounding_box_intersections, dict)
    assert all(
        edge in bounding_box_intersections
        for edge in [Edges.top.value, Edges.right.value, Edges.bottom.value, Edges.left.value]
    )


@pytest.fixture
def expected_test_geojson_content():
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {"name": "Severn Bridge parkrun"},
                "geometry": {"coordinates": [-2.6, 51.6], "type": "Point"},
                "id": 0,
            }
        ],
    }


@pytest.fixture
def sample_geojson_file_path():
    return "./tests/data/test_geojson_file.geojson"


def test_load_geojson_file(sample_geojson_file_path, expected_test_geojson_content):
    assert sorted(expected_test_geojson_content) == sorted(_load_geojson_file(sample_geojson_file_path))


def test_load_points_and_features_from_geojson(sample_geojson_file_path, expected_test_geojson_content):
    points, features = load_points_and_features_from_geojson(geojson_path=sample_geojson_file_path)

    expected_points = [[-2.6, 51.6]]
    expected_features = expected_test_geojson_content["features"]

    assert all(point in expected_points for point in points)
    assert sorted(features[0]) == sorted(expected_features[0])


def test_load_mask_geojson():
    expected_polygon = Polygon([[3, 1], [3, 5], [4, 5], [4, 7], [7, 7], [7, 2], [5, 2], [5, 1], [3, 1]])

    mask = load_mask_geojson(geojson_path="./tests/data/test_geojson_polygons_file.geojson")

    assert expected_polygon.equals(mask)


def test_get_bounding_segments(mock_bounding_box, mock_bounding_box_intersections):
    bounding_segments = get_bounding_segments(
        bounding_box=mock_bounding_box, bounding_box_intersections=mock_bounding_box_intersections
    )

    expected_bounding_segments = [
        ((-10, 10), [-6.0, 10]),
        ([-6.0, 10], (10, 10)),
        ((10, -10), [10, -9.0]),
        ([10, -9.0], [10, -2.25]),
        ([10, -2.25], (10, 10)),
        ((-10, -10), (10, -10)),
        ((-10, -10), [-10, 6.25]),
        ([-10, 6.25], (-10, 10)),
    ]

    assert all(segment in expected_bounding_segments for segment in bounding_segments)


def test_get_polygons_from_voronoi(mock_voronoi, mock_bounding_box, mock_expected_polygons):
    polygon_generator = get_polygons_from_voronoi(voronoi=mock_voronoi, bounding_box=mock_bounding_box)

    unified_polygons = unary_union([polygon for polygon in polygon_generator])
    expected_unified_polygon = unary_union(mock_expected_polygons)

    assert unified_polygons.equals(expected_unified_polygon)


def test_match_point_features_to_polygons(mock_points_as_features, mock_expected_polygons):
    matched_polygons_and_features = match_point_features_to_polygons(
        polygons=mock_expected_polygons, features=mock_points_as_features
    )

    expected_matches = zip()

    assert
