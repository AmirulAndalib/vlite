declare global {
	interface Window {
		vlitejs: {
			Player: any
		}
		YT: {
			Player: any
			PlayerState: {
				BUFFERING: any
				ENDED: any
				PLAYING: any
				PAUSED: any
				UNSTARTED: any
			}
		}
		onYouTubeIframeAPIReady: Function
	}
}

if (typeof window.vlitejs === 'undefined') {
	throw new Error('vlitejs :: The library is not available.')
}

const providerObjectName = 'YT'
let youtubeQueue: Array<any> = []

/**
 * vlitejs Player Youtube
 * @module vlitejs/Player/PlayerYoutube
 */
class PlayerYoutube extends window.vlitejs.Player {
	/**
	 * Initialize the player when the API is ready
	 */
	init() {
		this.waitUntilVideoIsReady()
			.then(() => this.onPlayerReady())
			.catch(() => youtubeQueue.push(this))
	}

	/**
	 * Wait until the API is ready
	 * @returns {Promise} The player is ready
	 */
	waitUntilVideoIsReady(): Promise<void> {
		return new window.Promise((resolve, reject) => {
			// Initialize the player if the API is already available or reject
			if (typeof window[providerObjectName] !== 'undefined') {
				this.initYoutubePlayer().then(resolve)
			} else {
				reject()
			}
		})
	}

	/**
	 * Initialize the player
	 */
	initYoutubePlayer(): Promise<void> {
		return new window.Promise((resolve, reject) => {
			this.instancePlayer = new window.YT.Player(this.element.getAttribute('id'), {
				videoId: this.element.getAttribute('data-youtube-id'),
				height: '100%',
				width: '100%',
				playerVars: {
					showinfo: 0,
					modestbranding: 0,
					autohide: 1,
					rel: 0,
					fs: this.options.fullscreen ? 1 : 0,
					wmode: 'transparent',
					playsinline: this.options.playsinline ? 1 : 0,
					controls: 0
				},
				events: {
					onReady: (data: any) => {
						this.element = data.target.getIframe()
						resolve()
					},
					onStateChange: (e: any) => this.onPlayerStateChange(e)
				}
			})
		})
	}

	/**
	 * Get the player instance
	 * @returns {Object} Youtube API instance
	 */
	getInstance(): any {
		return this.instancePlayer
	}

	/**
	 * Function executed when the player state changed
	 * @param {Object} e Event listener datas
	 */
	onPlayerStateChange(e: any) {
		if (e.data === window.YT.PlayerState.UNSTARTED) {
			if (this.options.controls && this.options.time) {
				this.onDurationChange()
			}
		} else if (e.data === window.YT.PlayerState.ENDED) {
			this.onVideoEnded()
		} else if (e.data === window.YT.PlayerState.PLAYING) {
			this.instanceParent.loading(false)

			if (this.options.controls) {
				setInterval(() => this.onTimeUpdate(), 100)
			}

			this.afterPlayPause('play')
		} else if (e.data === window.YT.PlayerState.PAUSED) {
			this.afterPlayPause('pause')
		} else if (e.data === window.YT.PlayerState.BUFFERING) {
			this.instanceParent.loading(true)
		}
	}

	/**
	 * Set the new current time for the player
	 * @param {Number} Current time video
	 */
	setCurrentTime(newTime: number) {
		this.instancePlayer.seekTo(newTime)
	}

	/**
	 * Get the player current time
	 * @returns {Promise<number>} Current time of the video
	 */
	getCurrentTime(): Promise<number> {
		return new window.Promise((resolve) => resolve(this.instancePlayer.getCurrentTime()))
	}

	/**
	 * Get the player duration
	 * @returns {Promise<number>} Duration of the video
	 */
	getDuration(): Promise<number> {
		return new window.Promise((resolve) => resolve(this.instancePlayer.getDuration()))
	}

	/**
	 * Play method of the player
	 */
	methodPlay() {
		this.instancePlayer.playVideo()
	}

	/**
	 * Pause method of the player
	 */
	methodPause() {
		this.instancePlayer.pauseVideo()
	}

	/**
	 * Mute method of the player
	 */
	methodMute() {
		this.instancePlayer.mute()
	}

	/**
	 * Unmute method of the player
	 */
	methodUnMute() {
		this.instancePlayer.unMute()
	}

	/**
	 * Remove the Youtube instance
	 */
	removeInstance() {
		this.instancePlayer.destroy()
	}
}

// Load the player API if it is not available
if (typeof window[providerObjectName] === 'undefined') {
	const script = document.createElement('script')
	script.async = true
	script.type = 'text/javascript'
	script.src = 'https://youtube.com/iframe_api'

	// Run the queue when the provider API is ready
	window.onYouTubeIframeAPIReady = () => {
		youtubeQueue.forEach((itemClass: any) => {
			itemClass.initYoutubePlayer().then(() => itemClass.onPlayerReady())
		})
		youtubeQueue = []
	}
	document.getElementsByTagName('body')[0].appendChild(script)
}

export default PlayerYoutube