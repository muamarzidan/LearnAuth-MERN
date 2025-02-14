import { User } from '../models/user.model.js';

export const checkRole = (roles) => {
	return (req, res, next) => {
		User.findById(req.userId)
			.then(user => {
				if (!user) {
					return res.status(404).json({ success: false, message: 'User not found' });
				}
				if (!roles.includes(user.role)) {
					return res.status(403).json({ success: false, message: 'Access denied' });
				}
				next();
			})
			.catch(error => {
				res.status(500).json({ success: false, message: error.message || 'Internal server error' });
			});
	};
};