import { BaseViewElement } from 'common/v-base.js';
import { adoptStyleSheets, css, customElement, first, html, on, onEvent } from 'dom-native';


const _compCss = css`
	:host{
		position: absolute;
		z-index: 100;
		top: 0; left: 0; bottom: 0; right: 0;
		background: rgba(0,0,0,.3);
	}

	.panel{
		position: absolute;
		right: -360px;
		top: 64px;
		width: 360px;
		bottom: 0;
		background: white;
		box-shadow: var(--elev-6-shadow);

		display: grid;
		grid-template-rows: 3rem 1fr;
		padding-bottom: 1rem;

		transition: .3s all ease-in;
	}

	.panel.show{
		right: 0;
	}

	header{
		display: grid;
		grid-template-columns: 1fr auto;
		padding-left: 1.5rem;
		align-items: center;
	}
	
	.title{
		align-self: center;
		font-size: 1.2rem;
	}

	header c-ico{
		width: 1.5rem;
		height: 1.5rem;
		justify-self: center;
		align-self: center;
		cursor:pointer;
	}

	.panel-content{
		display: grid;
		grid-auto-flow: row;
		grid-auto-rows: min-content;
		gap: 1rem;
		border-top: 1px solid #ccc;
	}

	.panel-content > section{
		border-bottom: 1px solid #ccc;
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(3, auto);
		font-size: 0.8rem;
		padding: 0.5rem 1.5rem;
	}

	.main-title{
		font-weight: bold;
	}

	.sub-title{
		grid-area: 2 / 1 / 3 / 2;
		padding-bottom: 0.5rem;
		color: #7f88af;
	}

	.role{
		grid-area: 3 / 1 / 4 / 2;
		color: #7f88af;
	}

	.member{
		margin-left: 2rem;
		color: #7f88af;
		grid-area: 3 / 2 / 4 / 3;
	}
`;


@customElement('v-profile')
export class ProfileView extends BaseViewElement {

	constructor() {
		super();
		adoptStyleSheets(this.attachShadow({ mode: 'open' }), _compCss).append(_renderShadow());
	}


	@onEvent('pointerup', '.do-close')
	doOk() {
		const panel = first(this.shadowRoot, ".panel");
		on(panel, 'transitionend', async (evt) => {
			this.remove();
		});
		first(this.shadowRoot, ".panel")?.classList.remove("show");
	}

	init() {
		setTimeout(()=>{
			first(this.shadowRoot, ".panel")?.classList.add("show");
		},	100);
	}

	postDisplay() {
	}
}

function _renderShadow(){
	let content = html`
		<div class="panel">
			<header>
				<div class="title">User Profile</div>
				<c-ico class="do-close" src="#ico-close"></c-ico>
			</header>
			<div class="panel-content">
				<section>
					<div class="main-title">Admin</div>
					<div class="sub-title">admin</div>
					<div class="role">Role: Unknown</div>
					<div class="member">Member since: unknown</div>
				</section>
			</div>
		</div>
	`
	return content;
}