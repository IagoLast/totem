(function() {
	AFRAME.registerComponent('totem', {
		schema: {
			color: { default: 'red' },
			cameraSelector: { default: 'a-entity[camera]' }
		},

		/**
		 * Called once when component is attached. Generally for initial setup.
		 */
		init: function() {
			this.el.addEventListener('mouseenter', this.onMouseEnter);
			this.el.addEventListener('mouseleave', this.onMouseLeave);
		},

		/**
		 * Called when component is attached and when component data changes.
		 * Generally modifies the entity based on the data.
		 */
		update: function(oldData) {
			// TODO: Allow different forms, maybe inherit geometry from parent node.
			var geometry = new THREE.BoxGeometry(0.3, 10, 0.3);
			var material = new THREE.MeshBasicMaterial({ color: this.data.color });
			var mesh = new THREE.Mesh(geometry, material);
			this.el.setObject3D('mesh', mesh);
		},

		/**
		 * Called when a component is removed (e.g., via removeAttribute).
		 * Generally undoes all modifications to the entity.
		 */
		remove: function() {},

		/**
		 * Called when entity pauses.
		 * Use to stop or remove any dynamic or background behavior such as events.
		 */
		pause: function() {},

		/**
		 * Called when entity resumes.
		 * Use to continue or add any dynamic or background behavior such as events.
		 */
		play: function() {},

		/**
		 * Called when the user looks at the Totem.
		 * Creates an movement animation attached to the camera object.
		 * This animation moves the camera object into the totem direction until the mouseLeave event is fired.
		 */
		onMouseEnter: function() {
			var cameraSelector = this.components.totem.data.cameraSelector;
			var camera = document.querySelector(cameraSelector);
			if (!camera) {
				throw new Error('No cameras found using the following selector: ' + cameraSelector);
				return;
			}
			var position = this.getAttribute('position');
			position = position.x + ' 1 ' + position.z;

			var animation = document.createElement('a-animation');
			animation.setAttribute('attribute', 'position');
			animation.setAttribute('to', position);
			animation.setAttribute('dur', '5000');
			animation.setAttribute('easing', 'linear');
			camera.appendChild(animation);

		},

		/**
		 * Called when the user stops looking at the Totem.
		 * Creates removes the a-animation node from the totem.
		 * Note: This only works with this line commented:
		 * https://github.com/aframevr/aframe/blob/master/src/core/a-animation.js#L246
		 * Otherwise the camera object goes back to the original position.
		 */
		onMouseLeave: function() {
			var cameraSelector = this.components.totem.data.cameraSelector;
			var camera = document.querySelector(cameraSelector);
			if (!camera) {
				throw new Error('No cameras found using the following selector: ' + cameraSelector);
				return;
			}
			var animation = camera.querySelector('a-animation');
			camera.removeChild(animation);
		},
	});

})();
