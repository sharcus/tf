export const getTestLogItems = () => {
  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  let lastMonth = new Date();
  lastMonth = addMonths(lastMonth, -1);

  let nextMonth = new Date();
  nextMonth = addMonths(nextMonth, 1);

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const items = [
    {
      id: 1,
      type: 1,
      from: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        10,
        30
      ),
      to: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        12,
        40
      ),
      description: "work on TF",
    },
    {
      id: 6,
      type: 1,
      from: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        15,
        0
      ),
      to: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        15,
        40
      ),
      description: "work on TF second time",
    },
    {
      id: 2,
      type: 3,
      from: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        13,
        0
      ),
      to: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        14,
        0
      ),
      description: "Read the book",
    },
    {
      id: 3,
      type: 4,
      from: new Date(
        tomorrow.getFullYear(),
        tomorrow.getMonth(),
        tomorrow.getDate(),
        9,
        0
      ),
      to: new Date(
        tomorrow.getFullYear(),
        tomorrow.getMonth(),
        tomorrow.getDate(),
        12,
        0
      ),
      description: "With with Biznet",
    },
    {
      id: 4,
      type: 4,
      from: new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth(),
        lastMonth.getDate(),
        9,
        0
      ),
      to: new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth(),
        lastMonth.getDate(),
        12,
        0
      ),
      description: "With with Biznet",
    },
    {
      id: 5,
      type: 5,
      from: new Date(
        lastWeek.getFullYear(),
        lastWeek.getMonth(),
        lastWeek.getDate(),
        18,
        0
      ),
      to: new Date(
        lastWeek.getFullYear(),
        lastWeek.getMonth(),
        lastWeek.getDate(),
        20,
        30
      ),
      description: "Play Football",
    },
    {
      id: 7,
      type: 5,
      from: new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        nextMonth.getDate(),
        14,
        0
      ),
      to: new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        nextMonth.getDate(),
        15,
        30
      ),
      description: "Play Hockey",
    },
    {
      id: 8,
      type: 5,
      from: new Date(
        nextWeek.getFullYear(),
        nextWeek.getMonth(),
        nextWeek.getDate(),
        14,
        0
      ),
      to: new Date(
        nextWeek.getFullYear(),
        nextWeek.getMonth(),
        nextWeek.getDate(),
        16,
        30
      ),
      description: "Play Ping-Pong",
    },
  ];

  return items;
};

export const getTextActivityItems = () => {
  return [
    { id: 1, enabled: true, name: "Primary" },
    { id: 2, enabled: true, name: "Education" },
    { id: 3, enabled: true, name: "Writing" },
    { id: 4, enabled: true, name: "Biznet" },
    { id: 5, enabled: true, name: "Secondary" },
    { id: 6, enabled: true, name: "Belarussian" },
  ];
};
