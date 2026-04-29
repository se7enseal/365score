'use client';

export default function BackButton() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <button 
      onClick={handleBack}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      返回上一页
    </button>
  );
}