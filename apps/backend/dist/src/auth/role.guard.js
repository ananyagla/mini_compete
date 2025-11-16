"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
class RoleGuard {
    constructor(allowedRoles) {
        this.allowedRoles = allowedRoles;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !this.allowedRoles.includes(user.role)) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return true;
    }
}
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map