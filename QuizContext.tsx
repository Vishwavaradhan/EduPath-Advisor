import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuizContextType {
  recommendedPrograms: string[];
  setRecommendedPrograms: (programs: string[]) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recommendedPrograms, setRecommendedPrograms] = useState<string[]>([]);

  return (
    <QuizContext.Provider value={{ recommendedPrograms, setRecommendedPrograms }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used inside QuizProvider');
  }
  return context;
};
