/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var cannon_es__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cannon-es */ "./node_modules/cannon-es/dist/cannon-es.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/RGBELoader.js */ "./node_modules/three/examples/jsm/loaders/RGBELoader.js");




class ThreeJSContainer {
    scene;
    light;
    shuttleMesh;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(0x00000));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(-20, 2, 0); // シャトルの後ろ
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0)); //　シャトル（原点）を見る
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        // 環境設定
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
        const world = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.World({ gravity: new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Vec3(0, 0, 0) }); // 宇宙なので無重力
        world.defaultContactMaterial.restitution = 0.9;
        world.defaultContactMaterial.friction = 0.0;
        let shuttle_vy = 0; // シャトルY軸方向の速度
        let shuttle_vz = 0; // シャトルZ軸方向の速度
        let shuttleSpeed = 2; // シャトルの移動速度
        //向かってくる惑星
        const planetMeshes = [];
        const planetBodies = [];
        const planetSpeed = 20;
        let planetNum = 15;
        //シャトル作成
        this.shuttleMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
        this.scene.add(this.shuttleMesh);
        const shuttleMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.5, metalness: 0.8 });
        const accentMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: 0xcc0000, roughness: 0.5, metalness: 0.8 });
        // メインボディ
        const bodyGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(5, 1.5, 2); // 少し太め
        const bodyMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(bodyGeometry, shuttleMaterial);
        bodyMesh.position.set(0, 0, 0);
        this.shuttleMesh.add(bodyMesh);
        // ノーズコーン
        const noseGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.ConeGeometry(1, 2, 32); // 半径1, 高さ2
        const noseMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(noseGeometry, shuttleMaterial);
        noseMesh.rotation.z = -Math.PI / 2; // X軸方向に向ける
        noseMesh.position.set(3.5, 0, 0); // 本体の前方に配置
        this.shuttleMesh.add(noseMesh);
        // 3. 翼
        const wingGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(1.5, 0.2, 5); // 薄くて広い翼
        const leftWingMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(wingGeometry, shuttleMaterial);
        leftWingMesh.position.set(-1.5, -0.5, 2.5); // 本体の後ろ寄り、下、左に配置
        this.shuttleMesh.add(leftWingMesh);
        const rightWingMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(wingGeometry, shuttleMaterial);
        rightWingMesh.position.set(-1.5, -0.5, -2.5); // 本体の後ろ寄り、下、右に配置
        this.shuttleMesh.add(rightWingMesh);
        // 4. 垂直尾翼
        const tailFinGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(1, 2, 0.2); // 高くて薄い尾翼
        const tailFinMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(tailFinGeometry, shuttleMaterial);
        tailFinMesh.position.set(-2, 1, 0); // 本体の後ろ寄り、上に配置
        this.shuttleMesh.add(tailFinMesh);
        // 5. エンジンノズル
        const nozzleGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.5, 0.7, 1, 16);
        const nozzleMesh1 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(nozzleGeometry, accentMaterial);
        nozzleMesh1.rotation.z = Math.PI / 2;
        nozzleMesh1.position.set(-3, -0.5, 0.7);
        this.shuttleMesh.add(nozzleMesh1);
        const nozzleMesh2 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(nozzleGeometry, accentMaterial);
        nozzleMesh2.rotation.z = Math.PI / 2;
        nozzleMesh2.position.set(-3, -0.5, -0.7);
        this.shuttleMesh.add(nozzleMesh2);
        // シャトル全体の物理ボディ (視覚的な形状を大まかにカバーするボックス)
        // シャトル全体のサイズから調整
        const shuttlePhysicsWidth = 7; // X軸方向の全長 (ノーズコーン含む)
        const shuttlePhysicsHeight = 3; // Y軸方向の全高 (尾翼含む)
        const shuttlePhysicsDepth = 6; // Z軸方向の全幅 (翼含む)
        const shuttleBody = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Body({ mass: 5 });
        const shuttleBodyShape = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Vec3(shuttlePhysicsWidth / 2, shuttlePhysicsHeight / 2, shuttlePhysicsDepth / 2));
        shuttleBody.addShape(shuttleBodyShape);
        shuttleBody.position.set(0, 0, 0); // シーンの中心に固定
        world.addBody(shuttleBody); // 物理ワールドにシャトルボディを追加
        //矢印キーでシャトル操作
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp': // 上移動 (Y軸正方向)
                    shuttle_vy = shuttleSpeed;
                    break;
                case 'ArrowDown': // 下移動 (Y軸負方向)
                    shuttle_vy = -shuttleSpeed;
                    break;
                case 'ArrowLeft': // 左移動 (Z軸負方向)
                    shuttle_vz = -shuttleSpeed;
                    break;
                case 'ArrowRight': // 右移動 (Z軸正方向)
                    shuttle_vz = shuttleSpeed;
                    break;
            }
        });
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                    shuttle_vy = 0; // キーが離されたらY軸方向の速度を0に
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    shuttle_vz = 0; // キーが離されたらZ軸方向の速度を0に
                    break;
            }
        });
        //惑星の作成
        for (let i = 0; i < planetNum; i++) {
            const size = three__WEBPACK_IMPORTED_MODULE_2__.MathUtils.randFloat(5, 20); // ランダムサイズ
            const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(size, 32, 16);
            const color = new three__WEBPACK_IMPORTED_MODULE_2__.Color().setRGB(Math.random(), Math.random(), Math.random());
            const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({
                color
            });
            planetMeshes.push(new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(geometry, material)); // 惑星配列にメッシュとボディのペアを追加
            const x = three__WEBPACK_IMPORTED_MODULE_2__.MathUtils.randFloat(200, 400); // 遠いX座標から出現
            const y = three__WEBPACK_IMPORTED_MODULE_2__.MathUtils.randFloatSpread(100); // Y軸に広く散らす
            const z = three__WEBPACK_IMPORTED_MODULE_2__.MathUtils.randFloatSpread(100); // Z軸に広く散らす
            planetMeshes[i].position.set(x, y, z);
            this.scene.add(planetMeshes[i]);
            const shape = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Sphere(size); // 物理ボディも球体
            const body = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Body({ mass: size * 50, shape: shape }); // 質量はサイズに比例
            planetBodies.push(body);
            planetBodies[i].position.set(planetMeshes[i].position.x, planetMeshes[i].position.y, planetMeshes[i].position.z); // 物理ボディの位置を設定
            planetBodies[i].quaternion.set(planetMeshes[i].quaternion.x, planetMeshes[i].quaternion.y, planetMeshes[i].quaternion.z, planetMeshes[i].quaternion.w);
            world.addBody(body); // 物理ワールドにボディを追加
        }
        // 背景設定
        new three_examples_jsm_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_1__.RGBELoader()
            .load('space.hdr', (texture) => {
            texture.mapping = three__WEBPACK_IMPORTED_MODULE_2__.EquirectangularReflectionMapping;
            this.scene.background = texture; // シーンの背景に設定
            this.scene.environment = texture; // 環境マップとしても設定（モデルの反射に影響）
        });
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(-lvec.x * 20, 10, 0);
        this.scene.add(this.light);
        let update = (time) => {
            // 物理ワールドをステップ更新 (固定フレームレートでシミュレーションを進める)
            world.step(1 / 60, time, 3);
            // シャトルメッシュと物理ボディの位置・回転を同期
            this.shuttleMesh.position.set(shuttleBody.position.x, shuttleBody.position.y, shuttleBody.position.z);
            this.shuttleMesh.quaternion.set(shuttleBody.quaternion.x, shuttleBody.quaternion.y, shuttleBody.quaternion.z, shuttleBody.quaternion.w);
            // シャトルにキー入力に応じた速度を適用 (X軸は0に固定し、Y/Z軸を操作)
            shuttleBody.velocity.y = shuttle_vy;
            shuttleBody.velocity.z = shuttle_vz;
            shuttleBody.velocity.x = 0; // X軸は動かないように固定
            // 惑星の移動と再利用のロジック
            for (let i = 0; i < planetMeshes.length; i++) {
                const planet = planetMeshes[i];
                // 惑星メッシュと物理ボディの位置・回転を同期
                planet.position.set(planetBodies[i].position.x, planetBodies[i].position.y, planetBodies[i].position.z);
                planet.quaternion.set(planetBodies[i].quaternion.x, planetBodies[i].quaternion.y, planetBodies[i].quaternion.z, planetBodies[i].quaternion.w);
                // 惑星にX軸方向の速度を適用して手前（X軸負方向）に動かす
                planetBodies[i].velocity.x = -planetSpeed;
                // 惑星がシャトルを通り過ぎたら、X軸の遠い位置にワープさせて再利用
                if (planetBodies[i].position.x < -20) { // シャトル（原点付近）よりX座標が小さくなったら
                    planetBodies[i].position.x = three__WEBPACK_IMPORTED_MODULE_2__.MathUtils.randFloat(200, 400); // X軸の遠い位置に再出現
                    planetBodies[i].position.y = three__WEBPACK_IMPORTED_MODULE_2__.MathUtils.randFloatSpread(150); // Y軸のランダムな位置に再出現
                    planetBodies[i].position.z = three__WEBPACK_IMPORTED_MODULE_2__.MathUtils.randFloatSpread(150); // Z軸のランダムな位置に再出現
                    // 再出現時に物理状態（速度、角速度、回転）をリセットし
                    planetBodies[i].velocity.set(0, 0, 0);
                    planetBodies[i].angularVelocity.set(0, 0, 0);
                    planetBodies[i].quaternion.set(0, 0, 0, 1);
                }
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(5, 5, 5));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_cannon-es_dist_cannon-es_js-node_modules_three_examples_jsm_controls_Orb-dafe00"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NncHJlbmRlcmluZy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCAqIGFzIENBTk5PTiBmcm9tICdjYW5ub24tZXMnO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuaW1wb3J0IHsgUkdCRUxvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL1JHQkVMb2FkZXIuanMnO1xuXG5cblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBzaHV0dGxlTWVzaDogVEhSRUUuR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIC8vIOeUu+mdoumDqOWIhuOBruS9nOaIkCjooajnpLrjgZnjgovmnqDjgZTjgajjgaspKlxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHgwMDAwMCkpO1xuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7IC8v44K344Oj44OJ44Km44Oe44OD44OX44KS5pyJ5Yq544Gr44GZ44KLXG5cblxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uc2V0KC0yMCwgMiwgMCk7IC8vIOOCt+ODo+ODiOODq+OBruW+jOOCjVxuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTsgLy/jgIDjgrfjg6Pjg4jjg6vvvIjljp/ngrnvvInjgpLopovjgotcblxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jHJlbmRlclxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgY29uc3QgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44K344O844Oz44Gu5L2c5oiQKOWFqOS9k+OBpzHlm54pXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgICAgLy8g55Kw5aKD6Kit5a6aXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICAgICAgY29uc3Qgd29ybGQgPSBuZXcgQ0FOTk9OLldvcmxkKHsgZ3Jhdml0eTogbmV3IENBTk5PTi5WZWMzKDAsIDAsIDApIH0pOyAvLyDlroflrpnjgarjga7jgafnhKHph43liptcbiAgICAgICAgd29ybGQuZGVmYXVsdENvbnRhY3RNYXRlcmlhbC5yZXN0aXR1dGlvbiA9IDAuOTtcbiAgICAgICAgd29ybGQuZGVmYXVsdENvbnRhY3RNYXRlcmlhbC5mcmljdGlvbiA9IDAuMDtcblxuICAgICAgICBsZXQgc2h1dHRsZV92eSA9IDA7IC8vIOOCt+ODo+ODiOODq1nou7jmlrnlkJHjga7pgJ/luqZcbiAgICAgICAgbGV0IHNodXR0bGVfdnogPSAwOyAvLyDjgrfjg6Pjg4jjg6ta6Lu45pa55ZCR44Gu6YCf5bqmXG4gICAgICAgIGxldCBzaHV0dGxlU3BlZWQgPSAyOyAvLyDjgrfjg6Pjg4jjg6vjga7np7vli5XpgJ/luqZcblxuICAgICAgICAvL+WQkeOBi+OBo+OBpuOBj+OCi+aDkeaYn1xuICAgICAgICBjb25zdCBwbGFuZXRNZXNoZXM6IFRIUkVFLk1lc2hbXSA9IFtdO1xuICAgICAgICBjb25zdCBwbGFuZXRCb2RpZXM6IENBTk5PTi5Cb2R5W10gPSBbXTtcbiAgICAgICAgY29uc3QgcGxhbmV0U3BlZWQgPSAyMDtcbiAgICAgICAgbGV0IHBsYW5ldE51bSA9IDE1O1xuXG5cbiAgICAgICAgLy/jgrfjg6Pjg4jjg6vkvZzmiJBcbiAgICAgICAgdGhpcy5zaHV0dGxlTWVzaCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLnNodXR0bGVNZXNoKTtcblxuICAgICAgICBjb25zdCBzaHV0dGxlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHhhYWFhYWEsIHJvdWdobmVzczogMC41LCBtZXRhbG5lc3M6IDAuOCB9KTtcbiAgICAgICAgY29uc3QgYWNjZW50TWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHhjYzAwMDAsIHJvdWdobmVzczogMC41LCBtZXRhbG5lc3M6IDAuOCB9KTtcblxuICAgICAgICAvLyDjg6HjgqTjg7Pjg5zjg4fjgqNcbiAgICAgICAgY29uc3QgYm9keUdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDUsIDEuNSwgMik7IC8vIOWwkeOBl+WkquOCgVxuICAgICAgICBjb25zdCBib2R5TWVzaCA9IG5ldyBUSFJFRS5NZXNoKGJvZHlHZW9tZXRyeSwgc2h1dHRsZU1hdGVyaWFsKTtcbiAgICAgICAgYm9keU1lc2gucG9zaXRpb24uc2V0KDAsIDAsIDApO1xuICAgICAgICB0aGlzLnNodXR0bGVNZXNoLmFkZChib2R5TWVzaCk7XG5cbiAgICAgICAgLy8g44OO44O844K644Kz44O844OzXG4gICAgICAgIGNvbnN0IG5vc2VHZW9tZXRyeSA9IG5ldyBUSFJFRS5Db25lR2VvbWV0cnkoMSwgMiwgMzIpOyAvLyDljYrlvoQxLCDpq5jjgZUyXG4gICAgICAgIGNvbnN0IG5vc2VNZXNoID0gbmV3IFRIUkVFLk1lc2gobm9zZUdlb21ldHJ5LCBzaHV0dGxlTWF0ZXJpYWwpO1xuICAgICAgICBub3NlTWVzaC5yb3RhdGlvbi56ID0gLU1hdGguUEkgLyAyOyAvLyBY6Lu45pa55ZCR44Gr5ZCR44GR44KLXG4gICAgICAgIG5vc2VNZXNoLnBvc2l0aW9uLnNldCgzLjUsIDAsIDApOyAvLyDmnKzkvZPjga7liY3mlrnjgavphY3nva5cbiAgICAgICAgdGhpcy5zaHV0dGxlTWVzaC5hZGQobm9zZU1lc2gpO1xuXG4gICAgICAgIC8vIDMuIOe/vFxuICAgICAgICBjb25zdCB3aW5nR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMS41LCAwLjIsIDUpOyAvLyDoloTjgY/jgabluoPjgYTnv7xcbiAgICAgICAgY29uc3QgbGVmdFdpbmdNZXNoID0gbmV3IFRIUkVFLk1lc2god2luZ0dlb21ldHJ5LCBzaHV0dGxlTWF0ZXJpYWwpO1xuICAgICAgICBsZWZ0V2luZ01lc2gucG9zaXRpb24uc2V0KC0xLjUsIC0wLjUsIDIuNSk7IC8vIOacrOS9k+OBruW+jOOCjeWvhOOCiuOAgeS4i+OAgeW3puOBq+mFjee9rlxuICAgICAgICB0aGlzLnNodXR0bGVNZXNoLmFkZChsZWZ0V2luZ01lc2gpO1xuXG4gICAgICAgIGNvbnN0IHJpZ2h0V2luZ01lc2ggPSBuZXcgVEhSRUUuTWVzaCh3aW5nR2VvbWV0cnksIHNodXR0bGVNYXRlcmlhbCk7XG4gICAgICAgIHJpZ2h0V2luZ01lc2gucG9zaXRpb24uc2V0KC0xLjUsIC0wLjUsIC0yLjUpOyAvLyDmnKzkvZPjga7lvozjgo3lr4TjgorjgIHkuIvjgIHlj7PjgavphY3nva5cbiAgICAgICAgdGhpcy5zaHV0dGxlTWVzaC5hZGQocmlnaHRXaW5nTWVzaCk7XG5cbiAgICAgICAgLy8gNC4g5Z6C55u05bC+57+8XG4gICAgICAgIGNvbnN0IHRhaWxGaW5HZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxLCAyLCAwLjIpOyAvLyDpq5jjgY/jgaboloTjgYTlsL7nv7xcbiAgICAgICAgY29uc3QgdGFpbEZpbk1lc2ggPSBuZXcgVEhSRUUuTWVzaCh0YWlsRmluR2VvbWV0cnksIHNodXR0bGVNYXRlcmlhbCk7XG4gICAgICAgIHRhaWxGaW5NZXNoLnBvc2l0aW9uLnNldCgtMiwgMSwgMCk7IC8vIOacrOS9k+OBruW+jOOCjeWvhOOCiuOAgeS4iuOBq+mFjee9rlxuICAgICAgICB0aGlzLnNodXR0bGVNZXNoLmFkZCh0YWlsRmluTWVzaCk7XG5cbiAgICAgICAgLy8gNS4g44Ko44Oz44K444Oz44OO44K644OrXG4gICAgICAgIGNvbnN0IG5venpsZUdlb21ldHJ5ID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC41LCAwLjcsIDEsIDE2KTtcbiAgICAgICAgY29uc3Qgbm96emxlTWVzaDEgPSBuZXcgVEhSRUUuTWVzaChub3p6bGVHZW9tZXRyeSwgYWNjZW50TWF0ZXJpYWwpO1xuICAgICAgICBub3p6bGVNZXNoMS5yb3RhdGlvbi56ID0gTWF0aC5QSSAvIDI7XG4gICAgICAgIG5venpsZU1lc2gxLnBvc2l0aW9uLnNldCgtMywgLTAuNSwgMC43KTtcbiAgICAgICAgdGhpcy5zaHV0dGxlTWVzaC5hZGQobm96emxlTWVzaDEpO1xuXG4gICAgICAgIGNvbnN0IG5venpsZU1lc2gyID0gbmV3IFRIUkVFLk1lc2gobm96emxlR2VvbWV0cnksIGFjY2VudE1hdGVyaWFsKTtcbiAgICAgICAgbm96emxlTWVzaDIucm90YXRpb24ueiA9IE1hdGguUEkgLyAyO1xuICAgICAgICBub3p6bGVNZXNoMi5wb3NpdGlvbi5zZXQoLTMsIC0wLjUsIC0wLjcpO1xuICAgICAgICB0aGlzLnNodXR0bGVNZXNoLmFkZChub3p6bGVNZXNoMik7XG5cblxuICAgICAgICAvLyDjgrfjg6Pjg4jjg6vlhajkvZPjga7niannkIbjg5zjg4fjgqMgKOimluimmueahOOBquW9oueKtuOCkuWkp+OBvuOBi+OBq+OCq+ODkOODvOOBmeOCi+ODnOODg+OCr+OCuSlcbiAgICAgICAgLy8g44K344Oj44OI44Or5YWo5L2T44Gu44K144Kk44K644GL44KJ6Kq/5pW0XG4gICAgICAgIGNvbnN0IHNodXR0bGVQaHlzaWNzV2lkdGggPSA3OyAvLyBY6Lu45pa55ZCR44Gu5YWo6ZW3ICjjg47jg7zjgrrjgrPjg7zjg7PlkKvjgoApXG4gICAgICAgIGNvbnN0IHNodXR0bGVQaHlzaWNzSGVpZ2h0ID0gMzsgLy8gWei7uOaWueWQkeOBruWFqOmrmCAo5bC+57+85ZCr44KAKVxuICAgICAgICBjb25zdCBzaHV0dGxlUGh5c2ljc0RlcHRoID0gNjsgLy8gWui7uOaWueWQkeOBruWFqOW5hSAo57+85ZCr44KAKVxuXG4gICAgICAgIGNvbnN0IHNodXR0bGVCb2R5ID0gbmV3IENBTk5PTi5Cb2R5KHsgbWFzczogNSB9KTtcbiAgICAgICAgY29uc3Qgc2h1dHRsZUJvZHlTaGFwZSA9IG5ldyBDQU5OT04uQm94KG5ldyBDQU5OT04uVmVjMyhcbiAgICAgICAgICAgIHNodXR0bGVQaHlzaWNzV2lkdGggLyAyLFxuICAgICAgICAgICAgc2h1dHRsZVBoeXNpY3NIZWlnaHQgLyAyLFxuICAgICAgICAgICAgc2h1dHRsZVBoeXNpY3NEZXB0aCAvIDJcbiAgICAgICAgKSk7XG4gICAgICAgIHNodXR0bGVCb2R5LmFkZFNoYXBlKHNodXR0bGVCb2R5U2hhcGUpO1xuICAgICAgICBzaHV0dGxlQm9keS5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7IC8vIOOCt+ODvOODs+OBruS4reW/g+OBq+WbuuWumlxuICAgICAgICB3b3JsZC5hZGRCb2R5KHNodXR0bGVCb2R5KTsgLy8g54mp55CG44Ov44O844Or44OJ44Gr44K344Oj44OI44Or44Oc44OH44Kj44KS6L+95YqgXG5cblxuICAgICAgICAvL+efouWNsOOCreODvOOBp+OCt+ODo+ODiOODq+aTjeS9nFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOiAvLyDkuIrnp7vli5UgKFnou7jmraPmlrnlkJEpXG4gICAgICAgICAgICAgICAgICAgIHNodXR0bGVfdnkgPSBzaHV0dGxlU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6IC8vIOS4i+enu+WLlSAoWei7uOiyoOaWueWQkSlcbiAgICAgICAgICAgICAgICAgICAgc2h1dHRsZV92eSA9IC1zaHV0dGxlU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6IC8vIOW3puenu+WLlSAoWui7uOiyoOaWueWQkSlcbiAgICAgICAgICAgICAgICAgICAgc2h1dHRsZV92eiA9IC1zaHV0dGxlU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOiAvLyDlj7Pnp7vli5UgKFrou7jmraPmlrnlkJEpXG4gICAgICAgICAgICAgICAgICAgIHNodXR0bGVfdnogPSBzaHV0dGxlU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBzaHV0dGxlX3Z5ID0gMDsgLy8g44Kt44O844GM6Zui44GV44KM44Gf44KJWei7uOaWueWQkeOBrumAn+W6puOCkjDjgatcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgc2h1dHRsZV92eiA9IDA7IC8vIOOCreODvOOBjOmbouOBleOCjOOBn+OCiVrou7jmlrnlkJHjga7pgJ/luqbjgpIw44GrXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8v5oOR5pif44Gu5L2c5oiQXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhbmV0TnVtOyBpKyspIHtcblxuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IFRIUkVFLk1hdGhVdGlscy5yYW5kRmxvYXQoNSwgMjApOyAvLyDjg6njg7Pjg4Djg6DjgrXjgqTjgrpcbiAgICAgICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KHNpemUsIDMyLCAxNik7XG4gICAgICAgICAgICBjb25zdCBjb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpLnNldFJHQihNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgICAgICAgICAgICBjb2xvclxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBsYW5ldE1lc2hlcy5wdXNoKG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCkpOyAvLyDmg5HmmJ/phY3liJfjgavjg6Hjg4Pjgrfjg6Xjgajjg5zjg4fjgqPjga7jg5rjgqLjgpLov73liqBcblxuICAgICAgICAgICAgY29uc3QgeCA9IFRIUkVFLk1hdGhVdGlscy5yYW5kRmxvYXQoMjAwLCA0MDApOyAvLyDpgaDjgYRY5bqn5qiZ44GL44KJ5Ye654++XG4gICAgICAgICAgICBjb25zdCB5ID0gVEhSRUUuTWF0aFV0aWxzLnJhbmRGbG9hdFNwcmVhZCgxMDApOyAvLyBZ6Lu444Gr5bqD44GP5pWj44KJ44GZXG4gICAgICAgICAgICBjb25zdCB6ID0gVEhSRUUuTWF0aFV0aWxzLnJhbmRGbG9hdFNwcmVhZCgxMDApOyAvLyBa6Lu444Gr5bqD44GP5pWj44KJ44GZXG4gICAgICAgICAgICBwbGFuZXRNZXNoZXNbaV0ucG9zaXRpb24uc2V0KHgsIHksIHopO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQocGxhbmV0TWVzaGVzW2ldKTtcblxuXG4gICAgICAgICAgICBjb25zdCBzaGFwZSA9IG5ldyBDQU5OT04uU3BoZXJlKHNpemUpOyAvLyDniannkIbjg5zjg4fjgqPjgoLnkIPkvZNcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBuZXcgQ0FOTk9OLkJvZHkoeyBtYXNzOiBzaXplICogNTAsIHNoYXBlOiBzaGFwZSB9KTsgLy8g6LOq6YeP44Gv44K144Kk44K644Gr5q+U5L6LXG4gICAgICAgICAgICBwbGFuZXRCb2RpZXMucHVzaChib2R5KTtcbiAgICAgICAgICAgIHBsYW5ldEJvZGllc1tpXS5wb3NpdGlvbi5zZXQocGxhbmV0TWVzaGVzW2ldLnBvc2l0aW9uLngsIHBsYW5ldE1lc2hlc1tpXS5wb3NpdGlvbi55LCBwbGFuZXRNZXNoZXNbaV0ucG9zaXRpb24ueik7IC8vIOeJqeeQhuODnOODh+OCo+OBruS9jee9ruOCkuioreWumlxuICAgICAgICAgICAgcGxhbmV0Qm9kaWVzW2ldLnF1YXRlcm5pb24uc2V0KHBsYW5ldE1lc2hlc1tpXS5xdWF0ZXJuaW9uLngsIHBsYW5ldE1lc2hlc1tpXS5xdWF0ZXJuaW9uLnksIHBsYW5ldE1lc2hlc1tpXS5xdWF0ZXJuaW9uLnosIHBsYW5ldE1lc2hlc1tpXS5xdWF0ZXJuaW9uLncpO1xuICAgICAgICAgICAgd29ybGQuYWRkQm9keShib2R5KTsgLy8g54mp55CG44Ov44O844Or44OJ44Gr44Oc44OH44Kj44KS6L+95YqgXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIOiDjOaZr+ioreWumlxuICAgICAgICBuZXcgUkdCRUxvYWRlcigpXG4gICAgICAgICAgICAubG9hZCgnc3BhY2UuaGRyJywgKHRleHR1cmUpID0+IHsgLy8g5a6H5a6Z44GuSERS55S75YOP77yILmhkcuODleOCoeOCpOODq++8ieOCkuODreODvOODiVxuICAgICAgICAgICAgICAgIHRleHR1cmUubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYmFja2dyb3VuZCA9IHRleHR1cmU7IC8vIOOCt+ODvOODs+OBruiDjOaZr+OBq+ioreWumlxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuZW52aXJvbm1lbnQgPSB0ZXh0dXJlOyAvLyDnkrDlooPjg57jg4Pjg5fjgajjgZfjgabjgoLoqK3lrprvvIjjg6Ljg4fjg6vjga7lj43lsITjgavlvbHpn7/vvIlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQoLWx2ZWMueCAqIDIwLCAxMCwgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuXG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcblxuICAgICAgICAgICAgLy8g54mp55CG44Ov44O844Or44OJ44KS44K544OG44OD44OX5pu05pawICjlm7rlrprjg5Xjg6zjg7zjg6Djg6zjg7zjg4jjgafjgrfjg5/jg6Xjg6zjg7zjgrfjg6fjg7PjgpLpgLLjgoHjgospXG4gICAgICAgICAgICB3b3JsZC5zdGVwKDEgLyA2MCwgdGltZSwgMyk7XG5cbiAgICAgICAgICAgIC8vIOOCt+ODo+ODiOODq+ODoeODg+OCt+ODpeOBqOeJqeeQhuODnOODh+OCo+OBruS9jee9ruODu+Wbnui7ouOCkuWQjOacn1xuICAgICAgICAgICAgdGhpcy5zaHV0dGxlTWVzaC5wb3NpdGlvbi5zZXQoc2h1dHRsZUJvZHkucG9zaXRpb24ueCwgc2h1dHRsZUJvZHkucG9zaXRpb24ueSwgc2h1dHRsZUJvZHkucG9zaXRpb24ueik7XG4gICAgICAgICAgICB0aGlzLnNodXR0bGVNZXNoLnF1YXRlcm5pb24uc2V0KHNodXR0bGVCb2R5LnF1YXRlcm5pb24ueCwgc2h1dHRsZUJvZHkucXVhdGVybmlvbi55LCBzaHV0dGxlQm9keS5xdWF0ZXJuaW9uLnosIHNodXR0bGVCb2R5LnF1YXRlcm5pb24udyk7XG5cbiAgICAgICAgICAgIC8vIOOCt+ODo+ODiOODq+OBq+OCreODvOWFpeWKm+OBq+W/nOOBmOOBn+mAn+W6puOCkumBqeeUqCAoWOi7uOOBrzDjgavlm7rlrprjgZfjgIFZL1rou7jjgpLmk43kvZwpXG4gICAgICAgICAgICBzaHV0dGxlQm9keS52ZWxvY2l0eS55ID0gc2h1dHRsZV92eTtcbiAgICAgICAgICAgIHNodXR0bGVCb2R5LnZlbG9jaXR5LnogPSBzaHV0dGxlX3Z6O1xuICAgICAgICAgICAgc2h1dHRsZUJvZHkudmVsb2NpdHkueCA9IDA7IC8vIFjou7jjga/li5XjgYvjgarjgYTjgojjgYbjgavlm7rlrppcblxuICAgICAgICAgICAgLy8g5oOR5pif44Gu56e75YuV44Go5YaN5Yip55So44Gu44Ot44K444OD44KvXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYW5ldE1lc2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYW5ldCA9IHBsYW5ldE1lc2hlc1tpXTtcblxuICAgICAgICAgICAgICAgIC8vIOaDkeaYn+ODoeODg+OCt+ODpeOBqOeJqeeQhuODnOODh+OCo+OBruS9jee9ruODu+Wbnui7ouOCkuWQjOacn1xuICAgICAgICAgICAgICAgIHBsYW5ldC5wb3NpdGlvbi5zZXQocGxhbmV0Qm9kaWVzW2ldLnBvc2l0aW9uLngsIHBsYW5ldEJvZGllc1tpXS5wb3NpdGlvbi55LCBwbGFuZXRCb2RpZXNbaV0ucG9zaXRpb24ueik7XG4gICAgICAgICAgICAgICAgcGxhbmV0LnF1YXRlcm5pb24uc2V0KHBsYW5ldEJvZGllc1tpXS5xdWF0ZXJuaW9uLngsIHBsYW5ldEJvZGllc1tpXS5xdWF0ZXJuaW9uLnksIHBsYW5ldEJvZGllc1tpXS5xdWF0ZXJuaW9uLnosIHBsYW5ldEJvZGllc1tpXS5xdWF0ZXJuaW9uLncpO1xuXG4gICAgICAgICAgICAgICAgLy8g5oOR5pif44GrWOi7uOaWueWQkeOBrumAn+W6puOCkumBqeeUqOOBl+OBpuaJi+WJje+8iFjou7josqDmlrnlkJHvvInjgavli5XjgYvjgZlcbiAgICAgICAgICAgICAgICBwbGFuZXRCb2RpZXNbaV0udmVsb2NpdHkueCA9IC1wbGFuZXRTcGVlZDtcblxuICAgICAgICAgICAgICAgIC8vIOaDkeaYn+OBjOOCt+ODo+ODiOODq+OCkumAmuOCiumBjuOBjuOBn+OCieOAgVjou7jjga7pgaDjgYTkvY3nva7jgavjg6/jg7zjg5fjgZXjgZvjgablho3liKnnlKhcbiAgICAgICAgICAgICAgICBpZiAocGxhbmV0Qm9kaWVzW2ldLnBvc2l0aW9uLnggPCAtMjApIHsgLy8g44K344Oj44OI44Or77yI5Y6f54K55LuY6L+R77yJ44KI44KKWOW6p+aomeOBjOWwj+OBleOBj+OBquOBo+OBn+OCiVxuICAgICAgICAgICAgICAgICAgICBwbGFuZXRCb2RpZXNbaV0ucG9zaXRpb24ueCA9IFRIUkVFLk1hdGhVdGlscy5yYW5kRmxvYXQoMjAwLCA0MDApOyAvLyBY6Lu444Gu6YGg44GE5L2N572u44Gr5YaN5Ye654++XG4gICAgICAgICAgICAgICAgICAgIHBsYW5ldEJvZGllc1tpXS5wb3NpdGlvbi55ID0gVEhSRUUuTWF0aFV0aWxzLnJhbmRGbG9hdFNwcmVhZCgxNTApOyAvLyBZ6Lu444Gu44Op44Oz44OA44Og44Gq5L2N572u44Gr5YaN5Ye654++XG4gICAgICAgICAgICAgICAgICAgIHBsYW5ldEJvZGllc1tpXS5wb3NpdGlvbi56ID0gVEhSRUUuTWF0aFV0aWxzLnJhbmRGbG9hdFNwcmVhZCgxNTApOyAvLyBa6Lu444Gu44Op44Oz44OA44Og44Gq5L2N572u44Gr5YaN5Ye654++XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g5YaN5Ye654++5pmC44Gr54mp55CG54q25oWL77yI6YCf5bqm44CB6KeS6YCf5bqm44CB5Zue6Lui77yJ44KS44Oq44K744OD44OI44GXXG4gICAgICAgICAgICAgICAgICAgIHBsYW5ldEJvZGllc1tpXS52ZWxvY2l0eS5zZXQoMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYW5ldEJvZGllc1tpXS5hbmd1bGFyVmVsb2NpdHkuc2V0KDAsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICBwbGFuZXRCb2RpZXNbaV0ucXVhdGVybmlvbi5zZXQoMCwgMCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH1cblxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG5cbiAgICBsZXQgdmlld3BvcnQgPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00oNjQwLCA0ODAsIG5ldyBUSFJFRS5WZWN0b3IzKDUsIDUsIDUpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfY2Fubm9uLWVzX2Rpc3RfY2Fubm9uLWVzX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiLWRhZmUwMFwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==