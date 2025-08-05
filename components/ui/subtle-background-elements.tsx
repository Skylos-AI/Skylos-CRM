interface SubtleBackgroundElementsProps {
  showGradientLines?: boolean;
  showFloatingShapes?: boolean;
  sectionType?: 'white' | 'slate' | 'blue';
}

export function SubtleBackgroundElements({ 
  showGradientLines = false, 
  showFloatingShapes = false,
  sectionType = 'white'
}: SubtleBackgroundElementsProps) {
  const getShapeColor = () => {
    switch (sectionType) {
      case 'slate':
        return 'bg-gray-300';
      case 'blue':
        return 'bg-white';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Lines */}
      {showGradientLines && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-20" />
        </>
      )}

      {/* Floating Shapes */}
      {showFloatingShapes && (
        <>
          <div className={`absolute top-20 right-20 w-16 h-16 ${getShapeColor()} rounded-full opacity-5`} />
          <div className={`absolute top-40 left-16 w-24 h-24 ${getShapeColor()} rounded-full opacity-5`} />
          <div className={`absolute bottom-32 right-32 w-20 h-20 ${getShapeColor()} rounded-full opacity-5`} />
          <div className={`absolute bottom-20 left-20 w-12 h-12 ${getShapeColor()} rounded-full opacity-5`} />
        </>
      )}
    </div>
  );
}