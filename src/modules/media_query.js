import { generateMedia } from "styled-media-query";

class MediaQuery {
	constructor() {
		this.media = generateMedia({
			// desktop: "767px",
			desktop: "640px",
		});
		this.desktop = this.media.greaterThan("desktop");
		this.mobile = this.media.lessThan("desktop");
	}
}

const media = new MediaQuery();

export default media

