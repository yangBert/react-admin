/**===================================================
 * Copyright(C) gzca.cc 
 * Author: yangjiafeng 
 * Updated Date: 2019.02.21
 * Version: 1.3
 * Description: 浏览器和GZCA数字证书客户端基于WebSocket通信 
 *====================================================*/
export const GZCA = {
	socket: null,
	success: false,
	connect: false,
	first: false,
	init(callback) {
		if (!this.success) {
			var websoketUrl, www_url = window.location.href;
			www_url.split('://')[0] === 'https' ? websoketUrl = 'wss://localhost:9528' : websoketUrl = 'ws://localhost:9527';
			this.socket = new WebSocket(websoketUrl);
			var self = this;
			try {
				this.socket.onerror = function (event) {
					self.success = false;
					if (!self.first) {
						alert('客户端未运行');
					} else {
						self.reconnect();
					}
				};
				this.socket.onopen = function (event) {
					console.log('WebSocket已成功连接');
					if (!self.first) {
						self.first = true;
					}
					self.onOpen(callback);
				};
				this.socket.onclose = function (event) {
					console.log('WebSocket未连接');
					self.success = false;
					self.connect = false;
				};
				this.socket.onmessage = function (msg) {
					self.connect = true; // 拿到任何消息都说明当前连接是正常的
				};
			} catch (error) {
				this.reconnect();
			}
		} else {
			this.onOpen(callback);
		}
	},
	onOpen: function (callback) {
		this.success = true;
		callback(this.success);
	},
	stop: function () {
		this.socket.close();
		return false;
	},
	reconnect: function () {
		var self = this;
		if (this.connect) {
			return;
		}
		// 没连接上会一直重连，设置延迟避免请求过多
		setTimeout(function () {
			self.init(function (result) {
				if (result) {
					self.connect = true;
				}
			});
		}, 2000);
	},
	getMsg: function (data, callback) {
		this.socket.send(data);
		this.socket.onmessage = function (msg) {
			callback(msg.data);
		};
	},
	// blob对象解析
	blobParse: function (result, callback) {
		var reader = new FileReader();
		reader.readAsText(result, 'GBK');
		reader.onload = function (e) {
			var blobtString = reader.result;
			var isErr = JSON.parse(blobtString);
			if (isErr.err === -1) {
				return;
			}
			callback(blobtString);
		};
	},
	backer: function (result, callback) {
		var o = JSON.parse(result);
		o.result.success ? callback(this.ownProp(o, 0)) : callback(this.ownProp(o));
	},
	ownProp: function (o, index) {
		var res = { success: o.result.success, msg: o.result.msg };
		if (index !== null || index !== undefined) {
			var $o = o.data[index];
			for (var prop in $o) {
				if ($o.hasOwnProperty(prop)) {
					res[prop] = $o[prop];
				}
			}
		}
		return res;
	},
	callbackMsg: function (jsonRequest, callback) {
		var self = this;
		this.getMsg(jsonRequest, function (res) {
			self.blobParse(res, function (res) {
				self.backer(res, function (res) {
					callback(res);
				});
			});
		});
	},

	/**
	 * 登陆(客户端弹出PIN码框)
	 * 参数: 
	 * ContainerName: 证书所在容器名
	 */
	GZCA_Login: function (ContainerName, callback) {
		var jsonRequest = '{"function":"GZCA_Login","args":[{"ContainerName": "' + ContainerName + '", "UserPin": "123456", "IsLogin": "N"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * 登陆(浏览器输入PIN码)
	 * 参数:
	 * ContainerName: 证书所在容器名
	 * UserPin: 用户Pin(最低六位)
	 */
	GZCA_Login_PIN: function (ContainerName, UserPin, callback) {
		var jsonRequest = '{"function":"GZCA_Login","args":[{"ContainerName": "' + ContainerName + '", "UserPin": "' + UserPin + '", "IsLogin": "Y"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * 注销登录
	 * ContainerName: 证书所在容器名
	 */
	GZCA_Logout: function (ContainerName, callback) {
		var jsonRequest = '{"function":"GZCA_Logout","args":[{"ContainerName": "' + ContainerName + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * 获取登陆状态
	 * ContainerName: 证书所在容器名
	 */
	GZCA_IsLogin: function (ContainerName, callback) {
		var jsonRequest = '{"function":"GZCA_IsLogin","args":[{"ContainerName": "' + ContainerName + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * 导出证书
	 * 参数: 
	 * ContainerName: 证书所在容器名
	 * CertType: 证书类型(0：both,1：签名,2：加密)
	 */
	GZCA_ExportCert: function (ContainerName, CertType, callback) {
		var jsonRequest = '{"function":"GZCA_ExportCert","args":[{"ContainerName": "' + ContainerName + '", "CertType": "' + CertType + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * 获取证书信息
	 * 参数: 
	 * CertB64: Base64编码的数字证书
	 */
	GZCA_GetCertInfo: function (CertB64, callback) {
		var jsonRequest = '{"function":"GZCA_GetCertInfo","args":[{"CertB64": "' + CertB64 + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * 根据OID获取证书信息
	 * 参数: 
	 * CertB64: Base64编码的数字证书 
	 * Oid: oid
	 */
	GZCA_GetCertInfoByOid: function (Oid, CertB64, callback) {
		var jsonRequest = '{"function":"GZCA_GetCertInfoByOid","args":[{"Oid":"' + Oid + '", "CertB64":"' + CertB64 + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			if (res.success) {
				var odiValue = res.OidValue;
				res.OidValue = odiValue.replace(/[\s]*/gm, '').replace(/^\d*\.*/g, '');
			}
			callback(res);
		});
	},
	/**
	 * Pkcs#1数字签名,可以配置GZCA_IsLogin使用，如果isLogin === true时，不需要验证PIN,否则需要
	 * 参数: 
	 * ContainerName: 证书所在容器名 
	 * Data: 带签名原文
	 */
	GZCA_Pkcs1SignData: function (ContainerName, Data, callback) {
		var jsonRequest = '{"function":"GZCA_Pkcs1SignData","args":[{"ContainerName":"' + ContainerName + '", "Data":"' + Data + '", "IsLogin":"Y"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * Pkcs#1数字签名,不管KEY是否为登陆状态，都需要验证PIN
	 * 参数: 
	 * ContainerName: 证书所在容器名 
	 * Data: 带签名原文
	 */
	GZCA_Pkcs1SignData_PIN: function (ContainerName, Data, callback) {
		var jsonRequest = '{"function":"GZCA_Pkcs1SignData","args":[{"ContainerName":"' + ContainerName + '", "Data":"' + Data + '", "IsLogin":"N"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * Pkcs#1数字签名验证
	 * 参数: 
	 * CerB64：Base64编码的签名证书
	 * Data：待签名的原文
	 * SignData：签名值
	 */
	GZCA_Pkcs1VerifySign: function (CertB64, Data, SignData, callback) {
		var jsonRequest = '{"function":"GZCA_Pkcs1VerifySign","args":[{"CertB64":"' + CertB64 + '", "Data":"' + Data + '", "SignData":"' + SignData + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},

	/**
	 * Pkcs#1数字签名,可以配置GZCA_IsLogin使用，如果isLogin === true时，不需要验证PIN,否则需要
	 * 参数: 
	 * ContainerName: 证书所在容器名 
	 * DataB64: Base64编码带签名原文
	 */
	GZCA_Pkcs1SignDataEx: function (ContainerName, DataB64, callback) {
		var jsonRequest = '{"function":"GZCA_Pkcs1SignDataEx","args":[{"ContainerName":"' + ContainerName + '", "DataB64":"' + DataB64 + '", "IsLogin":"Y"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * Pkcs#1数字签名,不管KEY是否为登陆状态，都需要验证PIN
	 * 参数: 
	 * ContainerName: 证书所在容器名 
	 * DataB64: Base64编码的带签名原文
	 */
	GZCA_Pkcs1SignData_PINEx: function (ContainerName, DataB64, callback) {
		var jsonRequest = '{"function":"GZCA_Pkcs1SignDataEx","args":[{"ContainerName":"' + ContainerName + '", "DataB64":"' + DataB64 + '", "IsLogin":"N"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * Pkcs#1数字签名验证
	 * 参数: 
	 * CerB64：Base64编码的签名证书
	 * DataB64：Base64编码的待签名的原文
	 * SignData：签名值
	 */
	GZCA_Pkcs1VerifySignEx: function (CertB64, DataB64, SignData, callback) {
		var jsonRequest = '{"function":"GZCA_Pkcs1VerifySignEx","args":[{"CertB64":"' + CertB64 + '", "DataB64":"' + DataB64 + '", "SignData":"' + SignData + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * SM2公钥加密(USBKEY)
	 * 参数: 
	 * ContainerName: 证书所在容器名
	 * Data: 待加密的原文
	 */
	GZCA_EccEncryptData: function (ContainerName, Data, callback) {
		var jsonRequest = '{"function":"GZCA_EccEncryptData","args":[{"ContainerName":"' + ContainerName + '", "Data":"' + Data + '", "IsLogin":"Y"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * SM2公钥加密(加密证书)
	 * 参数: 
	 * CerB64: base64编码的加密证书
	 * Data: 待加密的原文
	 */
	GZCA_EccEncryptDataEx: function (CerB64, Data, callback) {
		var jsonRequest = '{"function":"GZCA_EccEncryptDataEx","args":[{"CertB64":"' + CerB64 + '", "Data":"' + Data + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * SM2私钥解密
	 * 参数: 
	 * ContainerName: 证书所在容器名
	 * Data: 待解密的密文
	 */
	GZCA_EccDecryptData: function (ContainerName, Data, callback) {
		var jsonRequest = '{"function":"GZCA_EccDecryptData","args":[{"ContainerName":"' + ContainerName + '", "Data":"' + Data + '", "IsLogin":"Y"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * 非对称公钥加密(加密证书)
	 * 参数: 
	 * CerB64: base64编码的加密证书
	 * Data: 待加密的原文
	 */
	GZCA_AsymEncryptData: function (CerB64, Data, callback) {
		var jsonRequest = '{"function":"GZCA_AsymEncryptData","args":[{"CertB64":"' + CerB64 + '", "Data":"' + Data + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * 非对称私钥解密
	 * 参数: 
	 * ContainerName: 证书所在容器名
	 * Data: 待解密的密文
	 */
	GZCA_AsymDecryptData: function (ContainerName, Data, callback) {
		var jsonRequest = '{"function":"GZCA_AsymDecryptData","args":[{"ContainerName":"' + ContainerName + '", "Data":"' + Data + '", "IsLogin":"Y"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * SM4对称加密(字符串)
	 * Data: 待加密的原文
	 */
	GZCA_EncryptDataEx: function (Data, callback) {
		var jsonRequest = '{"function":"GZCA_EncryptDataEx","args":[{"Data":"' + Data + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * SM4对称解密(字符串)
	 * 参数: 
	 * KeyB64: 对称密钥，Base64编码
	 * Data: 待解密的数据，Base64编码
	 */
	GZCA_DecryptDataEx: function (KeyB64, Data, callback) {
		var jsonRequest = '{"function":"GZCA_DecryptDataEx","args":[{"KeyB64":"' + KeyB64 + '", "Data":"' + Data + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * SM4对称加密(文件)
	 * 参数: 
	 * ContainerName: 证书所在容器名
	 * SrcFile: 待加密的文件全路径(如c:\1.txt)
	 * DstFile: 加密后的文件全路径
	 */
	GZCA_EncryptFileEx: function (SrcFile, DstFile, callback) {
		SrcFile = SrcFile.replace(/\\/g, '/');
		DstFile = DstFile.replace(/\\/g, '/');
		var jsonRequest = '{"function":"GZCA_EncryptFileEx","args":[{"SrcFile":"' + SrcFile + '", "DstFile":"' + DstFile + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * SM4对称解密(文件)
	 * 参数: 
	 * ContainerName：证书所在容器名
	 * SrcFile：待解密的文件全路径,如c:\2.txt
	 * DstFile：解密后的文件全路径
	 */
	GZCA_DecryptFileEx: function (SrcFile, DstFile, KeyB64, callback) {
		SrcFile = SrcFile.replace(/\\/g, '/');
		DstFile = DstFile.replace(/\\/g, '/');
		var jsonRequest = '{"function":"GZCA_DecryptFileEx","args":[{"SrcFile":"' + SrcFile + '", "DstFile":"' + DstFile + '", "KeyB64":"' + KeyB64 + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * SM3杂凑值计算(字符串)
	 * 参数: 
	 * InData：待计算杂凑值的原文
	 * 返回: 
	 * HashB64: 杂凑值base64
	 */
	GZCA_HashData: function (InData, callback) {
		var jsonRequest = '{"function":"GZCA_HashData","args":[{"Data":"' + InData + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * SM3杂凑值计算(文件)
	 * 参数: 
	 * SrcFile: 待计算杂凑值的文件全路径(用”/”分隔，如c:/a.txt)
	 * 返回: 
	 * HashB64: 杂凑值base64
	 */
	GZCA_HashFile: function (SrcFile, callback) {
		SrcFile = SrcFile.replace(/\\/g, '/');
		var jsonRequest = '{"function":"GZCA_HashFile","args":[{"SrcFile":"' + SrcFile + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	/**
	 * 获取介质列表
	 */
	GetUKeyList: function (callback) {
		var jsonRequest = '{"function":"GetUKeyList","args":[]}', self = this;
		this.getMsg(jsonRequest, function (result) {
			self.blobParse(result, function (result) {
				var o = JSON.parse(result);
				if (o.result.success) {
					if (o.data.length > 1) {
						var layer = Object.create(self.ca);
						layer.title = "选择设备";
						layer.listText = "设备列表";

						var certList = document.getElementById(self.ca.listContainer);
						if (!certList) {
							layer = Object.create(self.ca);
							self.newLayer(layer);
							certList = document.getElementById(self.ca.listContainer);
						}
						certList.innerHTML = "";
						for (var i = 0; i < o.data.length; i++) {
							var p = document.createElement('p');
							p.innerHTML = '<span>' + o.data[i].manu + '</span>&nbsp;&nbsp;&nbsp;' + o.data[i].sn;
							if (i === 0) {
								p.className = 'active';
							}
							p.onclick = function () {
								self.clickP(this);
							};
							certList.appendChild(p);
						}
						var gzcaLayerSure = self.getNode('gzca-layer-sure');
						var gzcaLayerClose = self.getNode('gzca-layer-close');
						var gzcaLayerCancel = self.getNode('gzca-layer-cancel');
						gzcaLayerClose.onclick = function () {
							self.closeLayer();
						};
						gzcaLayerCancel.onclick = function () {
							self.closeLayer();
						};
						gzcaLayerSure.onclick = function () {
							self.selectCert(function (index) {
								callback(self.ownProp(o, index));
							});
						};
					} else {
						callback(self.ownProp(o, 0));
					}
				} else {
					callback(self.ownProp(o));
				}
			});
		});
	},
	/**
	 * 获取证书所在容器名
	 * createList: 是否创建证书列表，提供选择
	 */
	GZCA_GetContainerName: function (createList, certType, callback) {
		this.GZCA_GetCertList(createList, certType, callback);
	},
	GZCA_GetCertList: function (createList, certType, callback) {
		var self = this, ListenCode = this.ListenCode.CERTLIST;
		this.GZCA_StartListen(ListenCode, function (res) {
			if (res.success) {
				var jsonRequest = '{"function":"GZCA_GetCertList","args":[{"CertType": "' + certType + '"}]}';
				self.getMsg(jsonRequest, function (result) {
					self.blobParse(result, function (result) {
						var o = JSON.parse(result);
						var certList = document.getElementById(self.ca.listContainer);
						if (o.result.success) {
							if (createList) {
								var len = o.data.length;
								if (len > 1) {
									if (!certList) {
										var layer = Object.create(self.ca);
										self.newLayer(layer);
										certList = document.getElementById(self.ca.listContainer);
									}
									initList(certList, o.data);
								} else {
									if (certList) {
										initList(certList, o.data);
									} else {
										self.GZCA_StopListen(ListenCode, function () {
											callback(self.ownProp(o, 0));
										});
									}
								}
							} else {
								self.GZCA_StopListen(ListenCode, function () {
									callback({ success: true, msg: o.result.msg, data: o.data });
								});
							}
						} else {
							if (o.data && certList) {
								var gzcaCertLayer = document.querySelectorAll('.' + self.ca.container);
								gzcaCertLayer[0].parentNode.removeChild(gzcaCertLayer[0]);
							}
							self.GZCA_StopListen(ListenCode, function (res) {
								callback(self.ownProp(o));
							});
						}
						function initList(certList, list) {
							certList.innerHTML = "";
							for (var i = 0; i < list.length; i++) {
								var p = document.createElement('p');
								p.innerHTML = '<span>' + list[i].CN + '</span>' + list[i].ContainerName;
								if (i === 0) {
									p.className = 'active';
								}
								p.onclick = function () {
									self.clickP(this);
								};
								certList.appendChild(p);
							}
							var gzcaLayerSure = self.getNode('gzca-layer-sure');
							var gzcaLayerClose = self.getNode('gzca-layer-close');
							var gzcaLayerCancel = self.getNode('gzca-layer-cancel');
							gzcaLayerClose.onclick = function () {
								self.GZCA_StopListen(ListenCode, function () {
									self.closeLayer();
								});
							};
							gzcaLayerCancel.onclick = function () {
								self.GZCA_StopListen(ListenCode, function () {
									self.closeLayer();
								});
							};
							gzcaLayerSure.onclick = function () {
								self.selectCert(function (result) {
									self.GZCA_StopListen(ListenCode, function () {
										callback(self.ownProp(o, result));
									});
								});
							};
						}
					});
				});
			} else {
				self.GZCA_Msg(res.msg);
			}
		});
	},
	ListenCode: {
		CERTLIST: '00000001'
	},
	//开始监听消息
	GZCA_StartListen: function (Type, callback) {
		var jsonRequest = '{"function":"GZCA_StartListen","args":[{"Type":"' + Type + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	//停止监听消息
	GZCA_StopListen: function (Type, callback) {
		var jsonRequest = '{"function":"GZCA_StopListen","args":[{"Type":"' + Type + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	//数字信封加密(字符串)，支持多证书
	/**
	 * 参数: 1.certList加密证书列表，2.data:待加密数据base64编码列表，以|分隔
	 * 返回: 
	 */
	GZCA_EnvelopeSealData: function (certList, data, callback) {
		var jsonRequest = '{"function":"GZCA_EnvelopeSealData","args":[{"CertB64List":"' + certList + '", "DataB64List":"' + data + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	//数字信封解密(字符串)，支持多证书
	/**
	 * 参数: 1.containerName容器名，2.data:数字信封base64
	 * 返回: 
	 */
	GZCA_EnvelopeOpenData: function (containerName, data, callback) {
		var self = this;
		this.GZCA_IsLogin(containerName, function (res) {
			if (self.GZCA_Next(res)) {
				if (!res.isLogin) {
					self.GZCA_Login(containerName, function (res) {
						fn(res);
					});
				} else {
					fn(res);
				}
			}
			function fn(res) {
				if (self.GZCA_Next(res)) {
					var jsonRequest = '{"function":"GZCA_EnvelopeOpenData","args":[{"ContainerName":"' + containerName + '", "Data":"' + data + '", "IsLogin":"' + res.isLogin + '"}]}';
					self.callbackMsg(jsonRequest, function (res) {
						callback(res);
					});
				}
			}
		});
	},
	GZCA_Next: function (o) {
		if (!o.success) {
			alert(o.msg);
			return false;
		}
		return true;
	},
	//数字信封加密(字符串+文件混合)
	/**
	 * 参数: 1.CerB64加密证书，2.InData:待加密数据base64编码列表，以|分隔，3.SrcFile:待加密文件列表，以|分隔
	 * 返回: 
	 */
	GZCA_EnvelopeSealGroup: function (CerB64, InData, SrcFile, DstFile, callback) {
		if (!SrcFile) {
			SrcFile = "|";
		}
		SrcFile = SrcFile.replace(/\\/g, '/');
		DstFile = DstFile.replace(/\\/g, '/');
		SrcFile = SrcFile.replace(/\\"/g, '');
		DstFile = DstFile.replace(/\\"/g, '');
		var a = DstFile.split('/');
		if (/[\\/:*?]/g.test(a[a.length - 1])) {
			alert("文件名不能包含\\/:*?");
			return;
		}

		var jsonRequest = '{"function":"GZCA_EnvelopeSealGroup","args":[{"CertB64":"' + CerB64 + '", "DataB64List":"' + InData + '", "SrcFileList":"' + SrcFile + '", "DstFile":"' + DstFile + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	//数字信封解密(字符串+文件混合)
	/**
	 * 参数: 1.containerName容器名，2.SrcFile:，3.DstFileDir:，4.IsLogin
	 * 返回: 
	 */
	GZCA_EnvelopeOpenGroup: function (containerName, SrcFile, DstFileDir, IsLogin, callback) {
		SrcFile = SrcFile.replace(/\\/g, '/');
		DstFileDir = DstFileDir.replace(/\\/g, '/');
		SrcFile = SrcFile.replace(/\\"/g, '');
		DstFileDir = DstFileDir.replace(/\\"/g, '');
		var jsonRequest = '{"function":"GZCA_EnvelopeOpenGroup","args":[{"ContainerName":"' + containerName + '", "SrcFile":"' + SrcFile + '", "DstFileDir":"' + DstFileDir + '", "IsLogin":"' + IsLogin + '"}]}';
		this.callbackMsg(jsonRequest, function (res) {
			callback(res);
		});
	},
	GZCA_Msg: function (msg) {
		var div = document.createElement("div");
		var span = document.createElement("span");
		div.className = 'gzca-msg-container';
		span.innerHTML = msg;
		span.className = 'gzca-msg gzca-msg-show';
		div.appendChild(span);
		document.body.appendChild(div);
		var divNode = document.querySelectorAll('.gzca-msg-container');
		window.setTimeout(function () {
			divNode[0].parentNode.removeChild(divNode[0]);
		}, 3000);
	},
	getNode: function (id) {
		return document.getElementById(id);
	},

	// UI
	ca: {
		layerId: 'gzca-cert-layer',
		idName: "layerClass",
		title: "选择证书",
		height: 230,
		width: 500,
		content: "layerContent",
		conText: "没有证书",
		listText: '证书列表',
		head: "gzcaHeader",
		listContainer: "gzca-layer-cert-list",
		bottom: "layerBottom",
		buttonText: ["确认", "取消"],
		container: 'gzca-layerContainer',
		add: function () {
			var layerContainer = document.createElement("div");
			var addLayer = document.createElement("div");
			addLayer.id = this.layerId;
			addLayer.className = 'gzca-cert-layer';
			layerContainer.className = 'gzca-layerContainer';
			layerContainer.appendChild(addLayer);
			document.getElementsByTagName("body")[0].appendChild(layerContainer);
			addLayer.innerHTML = '<div id="layer"><div id="' + this.idName + '" onselectstart="return false;"><div id="' + this.head + '"><h3>' + this.title + '</h3><span class="close" id="gzca-layer-close" title="关闭"></span></div><div id="' + this.content + '"><fieldset><legend>' + this.listText + '</legend><div id="' + this.listContainer + '"></div></fieldset></div><div id="' + this.bottom + '"><span id="gzca-layer-sure">' + this.buttonText[0] + '</span><span id="gzca-layer-cancel">' + this.buttonText[1] + '</span></div></div></div>';
		}
	},
	eventEl: {
		addEvent: function (element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		removeEvent: function (element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		},
		stopPropagation: function (event) {
			var e = event || window.event;
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				return e.cancelBubble = true;
			}
		},
		preventDefaullt: function (event) {
			var e = event || window.event;
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
		}
	},
	clickP: function (e) {
		if (!this.hasClass(e, 'active')) {
			this.addClass(e, 'active');
			var sibilingArr = this.siblingElem(e);
			for (var s = 0; s < sibilingArr.length; s++) {
				this.removeClass(sibilingArr[s], 'active');
			}
		}
	},
	selectArr: [],
	keyid: '',
	selectCert: function (callback) {
		var getContentP = this.getNode("gzca-layer-cert-list").getElementsByTagName("p");
		for (var i = 0; i < getContentP.length; i++) {
			if (this.hasClass(getContentP[i], 'active')) {
				callback(i);
				this.closeLayer();
			}
		}
	},
	closeLayer: function () {
		var gzcaCertLayer = this.getNode('gzca-cert-layer').parentNode;
		gzcaCertLayer.parentNode.removeChild(gzcaCertLayer);
	},
	// 初始化函数
	newLayer: function newLayer(layer, o) {
		layer.add();
		var $this = this;
		var getLayer = $this.getNode(layer.idName);
		var getHeader = $this.getNode(layer.head);
		var getBottom = $this.getNode(layer.bottom);
		var getBtns = getBottom.getElementsByTagName("span");
		if (o && o.btn) {
			for (var i = 0; i < getBtns.length; i++) {
				getBtns[i].innerHTML = o.btn[i].text;
				getBtns[i].id = o.btn[i].id;
			}
		} else {
			for (var j = 0; j < getBtns.length; j++) {
				getBtns[j].innerHTML = layer.buttonText[j];
			}
		}
		// 设置高宽
		if (o) {
			layer.height = o.height;
			layer.width = o.width;
		}
		getLayer.style.height = layer.height + "px";
		getLayer.style.width = layer.width + "px";
		getLayer.style.marginTop = layer.height / -2 + "px";
		getLayer.style.marginLeft = layer.width / -2 + "px";
		// 弹出层拖拽
		var drag = function (disX, disY) {
			$this.eventEl.addEvent(document, "mousemove", dragMove);
			$this.eventEl.addEvent(getHeader, "mouseup", function () {
				$this.eventEl.removeEvent(document, "mousemove", dragMove);
			});
			function dragMove(event) {
				var e = event || window.event;
				var w = document.documentElement.clientWidth || document.body.clientWidth;
				var h = document.documentElement.clientHeight || document.body.clientHeight;
				getLayer.style.top = (e.clientY - disY) + "px";
				getLayer.style.left = (e.clientX - disX) + "px";
				if (e.clientY - disY <= 0) {
					getLayer.style.top = 0;
				}
				if (e.clientX - disX <= 0) {
					getLayer.style.left = 0;
				}
				if (e.clientY - disY >= h - getLayer.offsetHeight) {
					getLayer.style.top = (h - getLayer.offsetHeight) + "px";
				}
				if (w - (e.clientX - disX) - getLayer.offsetWidth <= 0) {
					getLayer.style.left = (w - getLayer.offsetWidth) + "px";
				}
				getLayer.style.marginTop = 0;
				getLayer.style.marginLeft = 0;
			}
		}
		var mdown = function (event) {
			var e = event || window.event;
			var disX = e.clientX - getLayer.offsetLeft;
			var disY = e.clientY - getLayer.offsetTop;
			drag(disX, disY);
		}
		this.eventEl.addEvent(getHeader, "mousedown", mdown);
	},
	// 样式类操作
	addClass: function (obj, cls) {
		var obj_class = obj.className, blank = (obj_class !== '') ? ' ' : '';
		var added = obj_class + blank + cls;
		obj.className = added;
	},
	removeClass: function (obj, cls) {
		var obj_class = ' ' + obj.className + ' ';
		obj_class = obj_class.replace(/(\s+)/gi, ' ');
		var removed = obj_class.replace(' ' + cls + ' ', ' ');
		removed = removed.replace(/(^\s+)|(\s+$)/g, '');
		obj.className = removed;
	},
	hasClass: function (obj, cls) {
		var obj_class = obj.className, obj_class_lst = obj_class.split(/\s+/), x = 0;
		for (x in obj_class_lst) {
			if (obj_class_lst[x] === cls) {
				return true;
			}
		}
		return false;
	},
	siblingElem: function (elem) {
		var _nodes = [], _elem = elem;
		while ((elem = elem.previousSibling)) {
			if (elem.nodeType === 1) {
				_nodes.push(elem);
			} else {
				continue;
			}
		}
		elem = _elem;
		while ((elem = elem.nextSibling)) {
			if (elem.nodeType === 1) {
				_nodes.push(elem);
			} else {
				continue;
			}
		}
		return _nodes;
	},
	// 弹出dialog
	getCertificate: function getCertificate(o) {
		var layer = Object.create(this.ca);
		this.newLayer(layer, o);
	},
};
