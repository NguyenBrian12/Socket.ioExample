const router = require("express").Router();
const { userFromJWTFilter } = require("../filters/jwt.user");
const actionType = require("./actionType.routes");
const assetRoutes = require("./asset.routes");
const blog = require("./blog.routes");
const blogCommentRoutes = require("./blogComment.routes");
const businessOwnerRoutes = require("./businessOwner.routes");
const businessRoutes = require("./business.routes");
const chatMessage = require("./chatMessage.routes");
const configRoutes = require("./config.routes");
const connectivityTestRoutes = require("./connectivityTest.routes");
const fileRoutes = require("./file.routes");
const industryRoutes = require("./industry.routes");
const postRoutes = require("./post.routes");
const postTagRoutes = require("./postTag.route");
const tagRoutes = require("./tag.route");
const testRoutes = require("./test.routes");
const unclaimedCreditBusiness = require("./unclaimedCredit.routes");
const unclaimedCreditCustomer = require("./unclaimedCreditCustomer.routes");
const unclaimedCreditMap = require("./unclaimedCreditMap.routes");
const unclaimedCreditsImport = require("./unclaimedCreditsImport.routes");
const customerHomepageRoutes = require("./customerHomepage.routes");
const userProfileRoutes = require("./userProfile.routes");
const userSelect = require("./userSelect.route");
module.exports = router;

router.use(userFromJWTFilter);

router.use("/api/actionType", actionType);
router.use("/api/asset", assetRoutes);
router.use("/api/blog", blog);
router.use("/api/blogComment", blogCommentRoutes);
router.use("/api/business", businessRoutes);
router.use("/api/businessowners", businessOwnerRoutes);
router.use("/api/chatMessages", chatMessage);
router.use("/api/config", configRoutes);
router.use("/api/connectivity-test", connectivityTestRoutes);
router.use("/api/customerHomepage", customerHomepageRoutes);
router.use("/api/files", fileRoutes);
router.use("/api/industry", industryRoutes);
router.use("/api/post", postRoutes);
router.use("/api/postTag", postTagRoutes);
router.use("/api/tag", tagRoutes);
router.use("/api/test", testRoutes);
router.use("/api/unclaimedcreditbusiness", unclaimedCreditBusiness); // claim process initiated by business owner
router.use("/api/unclaimedcreditcustomer", unclaimedCreditCustomer); // claim process initiated by customer
router.use("/api/unclaimedCreditMap", unclaimedCreditMap);
router.use("/api/unclaimedCreditsImport", unclaimedCreditsImport);
router.use("/api/userProfile", userProfileRoutes);
router.use("/api/userSelect", userSelect);
