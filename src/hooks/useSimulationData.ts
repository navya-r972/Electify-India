import { useState, useEffect } from 'react';

export interface StateData {
  name: string;
  population: number;
  currentElectionCost: number;
  onoeSavings: number;
  costPerVoter: number;
  onoeCostPerVoter: number;
}

export interface SimulationData {
  totalCurrentCost: number;
  totalOneNationCost: number;
  totalSavings: number;
  selectedState: StateData | null;
  allStates: StateData[];
}

const mockStateData: StateData[] = [
  {
    name: 'Uttar Pradesh',
    population: 240000000,
    currentElectionCost: 8500000000, // ₹8,500 Cr
    onoeSavings: 5100000000, // ₹5,100 Cr (60% savings)
    costPerVoter: 35.4,
    onoeCostPerVoter: 14.2
  },
  {
    name: 'Maharashtra',
    population: 125000000,
    currentElectionCost: 4200000000, // ₹4,200 Cr
    onoeSavings: 2520000000, // ₹2,520 Cr (60% savings)
    costPerVoter: 33.6,
    onoeCostPerVoter: 13.4
  },
  {
    name: 'Bihar',
    population: 130000000,
    currentElectionCost: 3900000000, // ₹3,900 Cr
    onoeSavings: 2340000000, // ₹2,340 Cr (60% savings)
    costPerVoter: 30.0,
    onoeCostPerVoter: 12.0
  },
  {
    name: 'West Bengal',
    population: 100000000,
    currentElectionCost: 3000000000, // ₹3,000 Cr
    onoeSavings: 1800000000, // ₹1,800 Cr (60% savings)
    costPerVoter: 30.0,
    onoeCostPerVoter: 12.0
  },
  {
    name: 'Rajasthan',
    population: 80000000,
    currentElectionCost: 2400000000, // ₹2,400 Cr
    onoeSavings: 1440000000, // ₹1,440 Cr (60% savings)
    costPerVoter: 30.0,
    onoeCostPerVoter: 12.0
  },
  {
    name: 'Tamil Nadu',
    population: 78000000,
    currentElectionCost: 2340000000, // ₹2,340 Cr
    onoeSavings: 1404000000, // ₹1,404 Cr (60% savings)
    costPerVoter: 30.0,
    onoeCostPerVoter: 12.0
  },
  {
    name: 'Madhya Pradesh',
    population: 85000000,
    currentElectionCost: 2550000000, // ₹2,550 Cr
    onoeSavings: 1530000000, // ₹1,530 Cr (60% savings)
    costPerVoter: 30.0,
    onoeCostPerVoter: 12.0
  },
  {
    name: 'Karnataka',
    population: 68000000,
    currentElectionCost: 2040000000, // ₹2,040 Cr
    onoeSavings: 1224000000, // ₹1,224 Cr (60% savings)
    costPerVoter: 30.0,
    onoeCostPerVoter: 12.0
  },
  {
    name: 'Gujarat',
    population: 70000000,
    currentElectionCost: 2100000000, // ₹2,100 Cr
    onoeSavings: 1260000000, // ₹1,260 Cr (60% savings)
    costPerVoter: 30.0,
    onoeCostPerVoter: 12.0
  },
  {
    name: 'Andhra Pradesh',
    population: 54000000,
    currentElectionCost: 1620000000, // ₹1,620 Cr
    onoeSavings: 972000000, // ₹972 Cr (60% savings)
    costPerVoter: 30.0,
    onoeCostPerVoter: 12.0
  }
];

export const useSimulationData = () => {
  const [simulationData, setSimulationData] = useState<SimulationData>({
    totalCurrentCost: 0,
    totalOneNationCost: 0,
    totalSavings: 0,
    selectedState: null,
    allStates: mockStateData
  });

  const [liveTicker, setLiveTicker] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate totals on mount
  useEffect(() => {
    const totalCurrent = mockStateData.reduce((sum, state) => sum + state.currentElectionCost, 0);
    const totalSavings = mockStateData.reduce((sum, state) => sum + state.onoeSavings, 0);
    
    setSimulationData(prev => ({
      ...prev,
      totalCurrentCost: totalCurrent,
      totalOneNationCost: totalCurrent - totalSavings,
      totalSavings: totalSavings
    }));
  }, []);

  // Live ticker animation
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setLiveTicker(prev => {
          const increment = simulationData.totalSavings / 100;
          if (prev >= simulationData.totalSavings) {
            setIsAnimating(false);
            return simulationData.totalSavings;
          }
          return prev + increment;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isAnimating, simulationData.totalSavings]);

  const selectState = (stateName: string) => {
    const state = mockStateData.find(s => s.name === stateName);
    if (state) {
      setSimulationData(prev => ({
        ...prev,
        selectedState: state
      }));
      
      // Trigger animation when Uttar Pradesh is selected (completion trigger)
      if (stateName === 'Uttar Pradesh') {
        setLiveTicker(0);
        setIsAnimating(true);
      }
    }
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000000) {
      return `₹${(amount / 1000000000).toFixed(1)}K Cr`;
    } else if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const getNationalImpact = () => {
    const totalStates = mockStateData.length;
    const avgSavingsPerState = simulationData.totalSavings / totalStates;
    const projectedNationalSavings = avgSavingsPerState * 36; // 36 states and UTs
    
    return {
      projectedSavings: projectedNationalSavings,
      percentageReduction: (simulationData.totalSavings / simulationData.totalCurrentCost) * 100,
      efficiencyGain: ((simulationData.totalCurrentCost - simulationData.totalOneNationCost) / simulationData.totalCurrentCost) * 100
    };
  };

  const getComparisonData = () => {
    return {
      current: {
        totalCost: simulationData.totalCurrentCost,
        costPerVoter: simulationData.allStates.reduce((sum, state) => sum + state.costPerVoter, 0) / simulationData.allStates.length,
        electionCycles: 5, // LS + 4 State elections in 5 years
        administrativeOverhead: simulationData.totalCurrentCost * 0.15, // 15% overhead
        securityCost: simulationData.totalCurrentCost * 0.25, // 25% security
        logisticsCost: simulationData.totalCurrentCost * 0.20 // 20% logistics
      },
      onoe: {
        totalCost: simulationData.totalOneNationCost,
        costPerVoter: simulationData.allStates.reduce((sum, state) => sum + state.onoeCostPerVoter, 0) / simulationData.allStates.length,
        electionCycles: 1, // Single election cycle
        administrativeOverhead: simulationData.totalOneNationCost * 0.10, // Reduced overhead
        securityCost: simulationData.totalOneNationCost * 0.20, // Optimized security
        logisticsCost: simulationData.totalOneNationCost * 0.15 // Optimized logistics
      }
    };
  };

  return {
    simulationData,
    liveTicker,
    isAnimating,
    selectState,
    formatCurrency,
    getNationalImpact,
    getComparisonData
  };
};