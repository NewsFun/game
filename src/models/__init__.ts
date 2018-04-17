module models {

    var _configProXy: ConfigProxy;
    var _loadingXy: LoadingProxy;
    var _storageProxy: StorageProxy;
    var _userProXy: UserProxy;

    /**
     * 配置信息的代理
     */
    export function configProXy(): ConfigProxy {
        if (!_configProXy) {
            _configProXy = new ConfigProxy();
        }
        return _configProXy;
    }

    /**
     * loading资源的代理
     */
    export function loadingXy(): LoadingProxy {
        if (!_loadingXy) {
            _loadingXy = new LoadingProxy();
        }
        return _loadingXy;
    }

    /**
     * 本地存储数据的代理
     */
    export function storageProxy(): StorageProxy {
        if (!_storageProxy) {
            _storageProxy = new StorageProxy();
            _storageProxy.loadData();
        }
        return _storageProxy;
    }

    /**
     * 当前用户的代理
     */
    export function userProXy(): UserProxy {
        if (!_userProXy) {
            _userProXy = new UserProxy();
        }
        return _userProXy;
    }
    
}