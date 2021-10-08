/* indent size: 2 */
'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Category = app.model.define(
    'category',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      tableName: 'categorys',
    }
  );

  Category.associate = function () {
    Category.hasMany(app.model.Article, {
      foreignKey: 'category_id', // targetmodel 中外键名称
      sorucekey: 'id', // sourcemodel 中关联键名称
    });
  };

  return Category;
};
