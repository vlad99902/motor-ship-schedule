class ScheduleController {
  async getAllSchedule(req, res) {
    try {
      res.json({
        schedule: [
          [
            {
              id: 7,
              value: '2021-08-21 18:00:00 GMT+3',
              label: '2021-08-21 18:00:00 GMT+3',
            },
            {
              id: 8,
              value: '2021-08-21 18:30:00 GMT+3',
              label: '2021-08-21 18:30:00 GMT+3',
            },
            {
              id: 9,
              value: '2021-08-21 18:45:00 GMT+3',
              label: '2021-08-21 18:45:00 GMT+3',
            },
            {
              id: 10,
              value: '2021-08-21 19:00:00 GMT+3',
              label: '2021-08-21 19:00:00 GMT+3',
            },
            {
              id: 11,
              value: '2021-08-21 19:15:00 GMT+3',
              label: '2021-08-21 19:15:00 GMT+3',
            },
            {
              id: 12,
              value: '2021-08-21 21:00:00 GMT+3',
              label: '2021-08-21 21:00:00 GMT+3',
            },
          ],
          [
            {
              id: 0,
              value: '2021-08-21 18:30:00 GMT+3',
              label: '2021-08-21 18:30:00 GMT+3',
            },
            {
              id: 1,
              value: '2021-08-21 18:45:00 GMT+3',
              label: '2021-08-21 18:45:00 GMT+3',
            },
            {
              id: 2,
              value: '2021-08-21 19:00:00 GMT+3',
              label: '2021-08-21 19:00:00 GMT+3',
            },
            {
              id: 3,
              value: '2021-08-21 19:15:00 GMT+3',
              label: '2021-08-21 19:15:00 GMT+3',
            },
            {
              id: 4,
              value: '2021-08-21 19:35:00 GMT+3',
              label: '2021-08-21 19:35:00 GMT+3',
            },
            {
              id: 5,
              value: '2021-08-21 21:50:00 GMT+3',
              label: '2021-08-21 21:50:00 GMT+3',
            },
            {
              id: 6,
              value: '2021-08-21 21:55:00 GMT+3',
              label: '2021-08-21 21:55:00 GMT+3',
            },
          ],
        ],
      });
    } catch (error) {
      res.status(500).json({ message: 'Can not get schedule' });
    }
  }
}

module.exports = new ScheduleController();
