const Sequelize = require('sequelize');

module.exports = class Answer extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                del_flag: {
                    type: Sequelize.BOOLEAN,
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
                timestamps: false,
                modelName: 'Answer',
                tableName: 'answers',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.Answer.belongsTo(db.Question, {
            foreignKey: 'question_id',
            targetKey: 'id',
        });
    }
};
