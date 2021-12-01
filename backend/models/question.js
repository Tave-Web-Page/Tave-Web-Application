const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                underscored: true,
                modelName: 'Question',
                tableName: 'questions',
                paranoid: true,
                timestamps: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.Question.hasMany(db.Answer, {
            foreignKey: 'question_id',
            sourceKey: 'id',
        });
    }
};
