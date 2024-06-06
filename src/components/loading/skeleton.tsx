// components/LoadingSkeleton.tsx

const LoadingSkeleton = () => {
    const skeletonCard = (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
                </div>
                <div className="w-20 h-6 bg-gray-300 rounded-md"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded-md mb-4"></div>
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="ml-3 w-32 h-6 bg-gray-300 rounded-md"></div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(3).fill(0).map((_, idx) => (
                    <div key={idx}>
                        {skeletonCard}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeleton;