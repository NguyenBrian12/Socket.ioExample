const router = require("express").Router();
const chatMessageService = require("../services/chatMessage.service");

const responses = require("../models/responses/index");

const getAllBusChatMessages = (req, res) => {
  console.log(req.user);
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 24;
  const businessId = req.query.businessId || "";

  chatMessageService
    .getAllBusChatMessages(req.user.tenantId, pageIndex, pageSize, businessId)
    .then(item => {
      res.json(new responses.ItemResponse(item)); // Need to add response
      console.log(item);
    })
    .catch(err => {
      console.log(err);
      res.set(500).send(err);
    });
};
const getAllChatMessages = (req, res) => {
  console.log(req.user);
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 24;

  chatMessageService
    .getAllChatMessages(req.user.tenantId, pageIndex, pageSize, req.params.tenantId)
    .then(item => {
      res.json(new responses.ItemResponse(item)); // Need to add response
      console.log(item);
    })
    .catch(err => {
      console.log(err);
      res.set(500).send(err);
    });
};
const getAllTenants = (req, res) => {
  chatMessageService
    .getAllTenants(req)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
module.exports = {
  getAllChatMessages,
  getAllTenants,
  getAllBusChatMessages
};
