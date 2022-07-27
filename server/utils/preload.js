import axios from 'axios';
import EntryModel from '../models/entryModel.js';

const preload = async () => {
  axios
    .get('https://api.publicapis.org/entries')
    .then(({ data }) => {
      const newEntry = new EntryModel({
        ...data,
      });
      newEntry.save(data);
    })
    .catch(error => {
      console.log(error);
    });
};

export default preload;
