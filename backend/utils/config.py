import yaml


def load_config(file_path):
    """
    Loads a YAML file from the given file path and returns the data.

    :param file_path: Path to the YAML file to be loaded.
    :return: Data loaded from the YAML file.
    """
    with open(file_path, "r") as file:
        try:
            return yaml.safe_load(file)
        except yaml.YAMLError as exc:
            print(exc)
