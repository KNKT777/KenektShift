
    const badges = [
      { name: 'Job Starter', description: 'Complete your first job', condition: (user) => user.jobsCompleted >= 1 },
      { name: 'Job Master', description: 'Complete 10 jobs', condition: (user) => user.jobsCompleted >= 10 },
    ];

    export const awardBadges = (user) => {
      const awardedBadges = badges.filter(badge => badge.condition(user));
      user.badges = awardedBadges.map(b => b.name);
      return user;
    };
    