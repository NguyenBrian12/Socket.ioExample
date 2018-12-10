const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const toCamel = require("./toCamel.js");

const getAllBusChatMessages = (tenantId, pageIndex, pageSize, businessId) => {
  return mssql
    .executeProc("ChatMessage_GetHistory", sqlRequest => {
      sqlRequest.addParameter("tenantId", TYPES.Int, tenantId);
      sqlRequest.addParameter("businessId", TYPES.Int, businessId);
      sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
    })
    .then(response => {
      console.log(response, "here");
      const totalCount =
        (response.resultSets &&
          response.resultSets[0] &&
          response.resultSets[0][0] &&
          response.resultSets[0][0].TotalRows) ||
        0;
      const totalPages = Math.ceil(totalCount / pageSize);
      const item = {
        pageItems: response.resultSets[0],
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages
      };
      const convertToCamel = toCamel(item);
      return convertToCamel;
    });
};
const getAllChatMessages = (tenantId, pageIndex, pageSize, reqTenantId) => {
  console.log(tenantId, parseInt(reqTenantId), "service");
  if (tenantId !== 1 && parseInt(reqTenantId) !== tenantId) {
    return Promise.reject("user not authorized");
  }
  return mssql
    .executeProc("ChatMessage_GetHistory", sqlRequest => {
      sqlRequest.addParameter("TenantId", TYPES.Int, reqTenantId);
      sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
    })
    .then(response => {
      console.log(response, "here");
      const totalCount =
        (response.resultSets &&
          response.resultSets[0] &&
          response.resultSets[0][0] &&
          response.resultSets[0][0].TotalRows) ||
        0;
      const totalPages = Math.ceil(totalCount / pageSize);
      const item = {
        pageItems: response.resultSets[0],
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages
      };
      const convertToCamel = toCamel(item);
      return convertToCamel;
    });
};
const getAllTenants = () => {
  return mssql.executeProc("Tenants_SelectForChat").then(response => {
    const item = {
      pageItems: response.resultSets[0]
    };
    const convertToCamel = toCamel(item);
    return convertToCamel;
  });
};
module.exports = {
  getAllChatMessages,
  getAllTenants,
  getAllBusChatMessages
};
