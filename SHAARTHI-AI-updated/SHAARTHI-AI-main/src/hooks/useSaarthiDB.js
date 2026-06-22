import SaarthiDB from '../services/storage';

export const useSaarthiDB = () => {
  return {
    db: SaarthiDB,
    save: () => SaarthiDB.save(),
    clear: () => SaarthiDB.clear(),
  };
};
