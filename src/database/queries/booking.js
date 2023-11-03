class BookingQueries {
  constructor() {}
  async insert(data) {
    return await hotel_db.booking
      .create(data)
      .then((response) => {
        return { isValid: true, data: response.dataValues };
      })
      .catch((err) => {
        return { isValid: false, data: err };
      });
  }
}

module.exports = BookingQueries;
