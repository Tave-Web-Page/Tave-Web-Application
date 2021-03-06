const express = require('express');
const logger = require('../config/winston');

const Question = require('../models/question');
const Answer = require('../models/answer');
const { Op } = require('sequelize');

const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const questions = await Question.findAll({
                attributes: [
                    'id',
                    'title',
                    'content',
                    'created_at',
                    'password',
                    'name',
                ],
                offset: Number(req.query.skip),
                limit: Number(req.query.limit),
                order: [['id', 'DESC']],
            });
            res.json({ questions });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const question = await Question.create({
                title: req.body.title,
                content: req.body.content,
                password: req.body.password,
                name: req.body.name,
            });
            logger.debug(question);
            res.status(201).json(question);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

router.route('/count').get(async (req, res, next) => {
    logger.debug(req.query.search);
    const title = req.query.search ? req.query.search : '';
    try {
        const count = await Question.count({
            where: { title: { [Op.like]: `%${title}%` } },
        });
        res.status(200).json({ count });
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

router
    .route('/:id')
    .get(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const question = await Question.findOne({
                include: [
                    {
                        model: Answer,
                    },
                ],
                attributes: ['id', 'title', 'content', 'created_at', 'name'],
                where: { id: req.params.id },
            });
            res.status(200).json({ question });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .patch(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const result = await Question.update(
                {
                    title: req.body.title,
                    content: req.body.content,
                    name: req.body.name,
                },
                {
                    where: { id: req.params.id },
                }
            );
            res.json({ result });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const result = await Question.destroy({
                where: { id: req.params.id },
            });
            res.json({ result });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

router.route('/:id/password').get(async (req, res, next) => {
    try {
        const question = await Question.findOne({
            where: { id: req.params.id, password: req.body.password },
        });
        res.status(200).json({ check: question !== null });
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

/**
 * @swagger
 * paths:
 *  /api/questions:
 *      get:
 *          tags: [questions]
 *          summary: Q&A ?????? ?????? ??????
 *          description: Q&A ?????? ?????? ??????
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: ?????? ?????? ?????? ??????
 *                  schema:
 *                      $ref: '#/components/schemas/Question'
 *      post:
 *          tags: [questions]
 *          summary: Q&A ?????? ??????
 *          description: Q&A ?????? ??????
 *          consumes:
 *          - application/json
 *          parameters:
 *          - in: body
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: ?????? ??????
 *          - in: body
 *            name: "content"
 *            required: true
 *            schema:
 *                type: string
 *                description: ?????? ??????
 *          - in: body
 *            name: "password"
 *            required: true
 *            schema:
 *                type: string
 *                description: ?????? ????????????
 *          responses:
 *              201:
 *                  description: ?????? ?????? ??????
 *                  schema:
 *                      $ref: '#/components/schemas/Question'
 *  /api/questions/{id}:
 *      get:
 *          tags: [questions]
 *          summary: Q&A ?????? ?????? ??????
 *          description: Q&A ?????? ?????? ??????
 *          produces:
 *          - application/json
 *          parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          responses:
 *              200:
 *                  description: ?????? ?????? ?????? ??????
 *                  schema:
 *                      $ref: '#/components/schemas/Question'
 *      patch:
 *          tags: [questions]
 *          summary: Q&A ?????? ??????
 *          description: Q&A ?????? ??????
 *          consumes:
 *          - application/json
 *          parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          - in: body
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: ?????? ??????
 *          - in: body
 *            name: "content"
 *            required: true
 *            schema:
 *                type: string
 *                description: ?????? ??????
 *          - in: body
 *            name: "password"
 *            required: true
 *            schema:
 *                type: string
 *                description: ?????? ????????????
 *          responses:
 *              201:
 *                  description: ?????? ?????? ??????
 *                  schema:
 *                      $ref: '#/components/schemas/Question'
 *      delete:
 *          tags: [questions]
 *          summary: Q&A ?????? ??????
 *          description: Q&A ?????? ??????
 *          produces:
 *          - application/json
 *          parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          responses:
 *              200:
 *                  description: ?????? ?????? ??????
 *                  schema:
 *                      $ref: '#/components/schemas/Question'
 *  /api/questions/{id}/password:
 *      get:
 *          tags: [questions]
 *          summary: Q&A ?????? ???????????? ??????
 *          description: Q&A ?????? ???????????? ??????
 *          produces:
 *          - application/json
 *          parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          responses:
 *              200:
 *                  description: ???????????? ?????? ??????
 *                  schema:
 *                      $ref: '#/components/schemas/Question'
 */

module.exports = router;
