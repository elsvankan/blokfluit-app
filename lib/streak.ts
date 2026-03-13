export const toDateKey = (date = new Date()): string => date.toISOString().slice(0, 10);

const diffDays = (oldDate: string, newDate: string): number => {
  const a = new Date(`${oldDate}T00:00:00`);
  const b = new Date(`${newDate}T00:00:00`);
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
};

export const calculateStreak = (
  lastPracticedDate: string | null,
  currentStreak: number,
  totalPracticeDays: number,
  longestStreak: number,
  now = new Date()
) => {
  const todayKey = toDateKey(now);

  if (!lastPracticedDate) {
    return { streak: 1, totalPracticeDays: 1, longestStreak: Math.max(1, longestStreak), todayKey, gainedStar: true };
  }

  const delta = diffDays(lastPracticedDate, todayKey);

  if (delta === 0) {
    return { streak: currentStreak, totalPracticeDays, longestStreak, todayKey, gainedStar: false };
  }

  if (delta === 1) {
    const newStreak = currentStreak + 1;
    return {
      streak: newStreak,
      totalPracticeDays: totalPracticeDays + 1,
      longestStreak: Math.max(longestStreak, newStreak),
      todayKey,
      gainedStar: true
    };
  }

  return {
    streak: 1,
    totalPracticeDays: totalPracticeDays + 1,
    longestStreak: Math.max(longestStreak, 1),
    todayKey,
    gainedStar: true
  };
};
