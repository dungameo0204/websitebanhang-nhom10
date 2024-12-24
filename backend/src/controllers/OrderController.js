const OrderService = require('../services/OrderService');

const getOrder = async (req, res) => {
    try {
        const {userID} = req.params;
        // console.log(userID);

        if(!userID) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'UserId is required'
            })
        }

        const response = await OrderService.getOrder(userID);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message || 'An unexpected error occurred while getting order'
        });
    }
}