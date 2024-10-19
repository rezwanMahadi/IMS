// components/Loader.js
import * as React from "react"

const Loader = React.forwardRef(() => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
    </div>
  );
})
Loader.displayName = 'Loader';
export { Loader }
