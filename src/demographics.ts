import natural from 'natural';

   export interface DemographicSplits {
     genderSplit: { male: number; female: number };
     ageSplit: { [range: string]: number };
     stateSplit?: { [state: string]: number }; // Optional, harder to estimate
   }

   const classifier = new natural.BayesClassifier();
   classifier.addDocument('workout fitness gym exercise', 'fitness');
   classifier.addDocument('gameplay streaming esports gaming', 'gaming');
   classifier.addDocument('cooking recipes food chef', 'cooking');
   classifier.train();

   const demographicEstimates: { [category: string]: DemographicSplits } = {
     fitness: {
       genderSplit: { male: 40, female: 60 },
       ageSplit: { '18-24': 30, '25-34': 40, '35-44': 20, '45+': 10 },
     },
     gaming: {
       genderSplit: { male: 70, female: 30 },
       ageSplit: { '13-17': 20, '18-24': 50, '25-34': 20, '35+': 10 },
     },
     cooking: {
       genderSplit: { male: 30, female: 70 },
       ageSplit: { '18-24': 20, '25-34': 30, '35-44': 30, '45+': 20 },
     },
     default: {
       genderSplit: { male: 50, female: 50 },
       ageSplit: { '18-24': 25, '25-34': 25, '35-44': 25, '45+': 25 },
     },
   };

   export function estimateDemographics(contentDescription: string): DemographicSplits {
     const category = classifier.classify(contentDescription) || 'default';
     return demographicEstimates[category] || demographicEstimates.default;
   }