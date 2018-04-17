var models;
(function (models) {
    var _configProXy;
    var _loadingXy;
    var _storageProxy;
    var _userProXy;
    /**
     * 配置信息的代理
     */
    function configProXy() {
        if (!_configProXy) {
            _configProXy = new models.ConfigProxy();
        }
        return _configProXy;
    }
    models.configProXy = configProXy;
    /**
     * loading资源的代理
     */
    function loadingXy() {
        if (!_loadingXy) {
            _loadingXy = new models.LoadingProxy();
        }
        return _loadingXy;
    }
    models.loadingXy = loadingXy;
    /**
     * 本地存储数据的代理
     */
    function storageProxy() {
        if (!_storageProxy) {
            _storageProxy = new models.StorageProxy();
            _storageProxy.loadData();
        }
        return _storageProxy;
    }
    models.storageProxy = storageProxy;
    /**
     * 当前用户的代理
     */
    function userProXy() {
        if (!_userProXy) {
            _userProXy = new models.UserProxy();
        }
        return _userProXy;
    }
    models.userProXy = userProXy;
})(models || (models = {}));
//# sourceMappingURL=__init__.js.map