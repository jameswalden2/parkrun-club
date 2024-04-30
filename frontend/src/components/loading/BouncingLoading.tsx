export default function BouncingLoading() {
    return (
        <div className="w-full h-16 flex items-center justify-center">
            <p className="animate-bounce font-semibold">Loading</p>
            <p className="animate-bounce [animation-delay:0.1s]">.</p>
            <p className="animate-bounce [animation-delay:0.2s]">.</p>
            <p className="animate-bounce [animation-delay:0.3s]">.</p>
        </div>
    );
}
