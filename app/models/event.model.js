module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    eventName: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    location: {
      type: Sequelize.STRING
    }
  });
  return Event;
};