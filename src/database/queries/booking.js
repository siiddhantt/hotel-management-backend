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

  async findAll(data) {
    let order, advancedFilters;
    if (data.order) order = data.order;
    else order = [["createdAt", "DESC"]];

    if (data.advancedFilters) advancedFilters = data.advancedFilters;
    else advancedFilters = null;

    return await hotel_db.booking
      .findAll({ where: advancedFilters, order, raw: true })
      .then((response) => {
        if (response === null) throw response;
        return { isValid: true, data: response };
      })
      .catch((err) => {
        return { isValid: false, data: err };
      });
  }
}

module.exports = BookingQueries;
