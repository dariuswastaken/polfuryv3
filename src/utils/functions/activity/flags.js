let flags = {
  Cadet: {
    up: {
      requiredDays: 4,
      gradeRating: ['B', 'A'],
      mdtAndRadioRequired: true,
      addToList: true,
      sanctions: 'none',
      exceptions: {
        raports: 15,
        bypassSanctions: false
      }
    },
    out: {
      gradeRating: 'F'
    }
  },
  Agent: {
    up: {
      requiredDays: 12,
      gradeRating: ['B', 'A'],
      mdtAndRadioRequired: true,
      addToList: true,
      sanctions: 'none',
      exceptions: {
        grade: 10,
        bypassSanctions: false
      }
    },
    down: {
      gradeRating: 'D'
    },
    out: {
      gradeRating: 'F'
    }
  },
  'Agent Principal': {
    up: {
      requiredDays: 18,
      gradeRating: ['B', 'A'],
      mdtAndRadioRequired: true,
      addToList: false,
      sanctions: 'none',
      exceptions: {
        grade: 10,
        bypassSanctions: false
      }
    },
    down: {
      gradeRating: 'D'
    },
    out: {
      gradeRating: 'F'
    }
  },
  'Agent Sef Principal': {
    up: {
      requiredDays: 25,
      gradeRating: ['B', 'A'],
      mdtAndRadioRequired: true,
      addToList: false,
      sanctions: 'none',
      exceptions: {
        bypassSanctions: false
      }
    },
    down: {
      gradeRating: 'D'
    },
    out: {
      gradeRating: 'F'
    }
  }
};

export { flags };
