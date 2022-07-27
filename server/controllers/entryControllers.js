import EntryModel from '../models/entryModel.js';

export const getEntries = async (req, res, next) => {
  const { q } = req.query;

  try {
    const { entries, count } = await EntryModel.findOne({});

    if (q) {
      const result = entries.filter(entry =>
        entry?.API?.toLowerCase().includes(q?.toLowerCase())
      );

      res.status(200).json({ entries: result, count: result.length, q });
      return;
    }

    res.status(200).json({ entries, count });
  } catch (error) {
    res.status(400).json(error);
  }
};
