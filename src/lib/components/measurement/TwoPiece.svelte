<script>
	let stretchable = false;
	let stretchable_bottom = false;
	export let inData;
	export let measured;
	let measureDesc;

	function submitta(e) {
		const formData = new FormData(e.target);
		for (let field of formData.entries()) {
			const [key, value] = field;
			measureDesc += `<b>${key}: </b> ${value} <br />`;
			const valueF = parseFloat(value);
			inData[key] = valueF;
		}

		inData.stretchable = stretchable;
		inData.stretchable_bottom = stretchable_bottom;
		inData.description = measureDesc;
		measured = true;
	}
</script>

<form on:submit|preventDefault={submitta}>
	<div class="head_grid">
		<h3>Top</h3>
		<div class="stretcher">
			<label for="stretchable">Stretchable: </label>
			<input type="checkbox" name="stretchable" id="stretchable" bind:checked={stretchable} />
		</div>
	</div>
	<div class="single_row">
		<div class="column">
			<label for="top_length">Length:</label>
			<input type="number" step=".5" name="top_length" id="top_length" />
		</div>
		<div class="column">
			<label for="shoulder_width">Shoulder:</label>
			<input type="number" step=".5" name="shoulder_width" id="shoulder_width" />
		</div>
		<div class="column">
			<label for="sleeve_length">Sleeve:</label>
			<input type="number" step=".5" name="sleeve_length" id="sleeve_length" />
		</div>
	</div>

	<div class="group_row">
		<label for="bicep">Bicep:</label>
		<input type="number" name="bicep" id="bicep" />
		{#if stretchable}
			<input type="number" name="bicep_end" id="bicep_end" />
		{/if}
	</div>
	<div class="group_row">
		<label for="sleevecuff">Cuff:</label>
		<input type="number" name="sleevecuff" id="sleevecuff" />
		{#if stretchable}
			<input type="number" name="sleevecuff_end" id="sleevecuff_end" />
		{/if}
	</div>
	<div class="group_row">
		<label for="bust">Bust: </label>
		<input type="number" name="bust" id="bust" />
		{#if stretchable}
			<input type="number" name="bust_end" id="bust_end" />
		{/if}
	</div>
	<div class="group_row">
		<label for="top_waist">Waist: </label>
		<input type="number" name="top_waist" id="top_waist" />
		{#if stretchable}
			<input type="number" name="top_waistend" id="top_waistend" />
		{/if}
	</div>

	<div class="head_grid">
		<h3>Bottom</h3>
		<div class="stretcher">
			<label for="stretchable_bottom">Stretchable: </label>
			<input
				type="checkbox"
				name="stretchable_bottom"
				id="stretchable_bottom"
				bind:checked={stretchable_bottom}
			/>
		</div>
	</div>

	<div class="single_row">
		<div class="column">
			<label for="bottom_length">Length: </label>
			<input type="number" step=".5" name="bottom_length" id="bottom_length" />
		</div>
		<div class="column">
			<label for="rise">Rise: </label>
			<input type="number" step=".5" name="rise" id="rise" />
		</div>
		<div class="column">
			<label for="inseam">Inseam: </label>
			<input type="number" step=".5" name="inseam" id="inseam" />
		</div>
	</div>

	<div class="group_row">
		<label for="waist">Waist: </label>
		<input type="number" name="waist" id="waist" />
		{#if stretchable_bottom}
			<input type="number" name="waist_end" id="waist_end" />
		{/if}
	</div>
	<div class="group_row">
		<label for="hips">Hips: </label>
		<input type="number" name="hips" id="hips" />
		{#if stretchable_bottom}
			<input type="number" name="hips_end" id="hips_end" />
		{/if}
	</div>
	<div class="group_row">
		<label for="thigh">Thigh: </label>
		<input type="number" name="thigh" id="thigh" />
		{#if stretchable_bottom}
			<input type="number" name="thigh_end" id="thigh_end" />
		{/if}
	</div>
	<div class="group_row">
		<label for="pant_cuff">Cuff: </label>
		<input type="number" name="pant_cuff" id="pant_cuff" />
		{#if stretchable_bottom}
			<input type="number" name="pant_cuffend" id="pant_cuffend" />
		{/if}
	</div>
	<button type="submit" class="submit">Enter Measurements</button>
</form>

<style>
	form {
		height: 80vh;
		overflow-y: scroll;
	}

	form::-webkit-scrollbar {
		width: 0;
		background: transparent;
	}

	input[type='number'] {
		font-size: 1.8rem;
		width: 7ch;
		border-radius: 5px;
		outline: none;
	}

	h3 {
		margin: 0;
	}

	input[type='number']:hover,
	input[type='number']:focus,
	input[type='number']:active {
		border: 4px solid rgba(186, 8, 181, 1);
	}
	.head_grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: center;
		align-items: center;
		gap: 16px;
		line-height: 1;
		margin-top: 32px;
	}

	.head_grid h3 {
		grid-column: 2/3;
	}

	.stretcher {
		grid-column: 3/4;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.single_row {
		display: flex;
		justify-content: space-around;
		margin: 16px;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.group_row {
		display: grid;
		grid-template-columns: 65px 80px 80px;
		width: max-content;
		gap: 16px;
		margin: 16px auto;
	}

	.group_row label {
		grid-column: 1/2;
	}

	.group_row input {
		grid-column: auto;
	}

	.submit {
		padding: 8px;
		width: 80%;
		margin: 16px 10%;
		background-image: radial-gradient(
			circle farthest-corner at 10.2% 55.8%,
			rgba(252, 37, 103, 1) 0%,
			rgba(250, 38, 151, 1) 46.2%,
			rgba(186, 8, 181, 1) 90.1%
		);

		border-radius: 5px;
		color: white;
		font-weight: 600;
	}
</style>
