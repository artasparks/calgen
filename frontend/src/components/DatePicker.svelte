<script>
  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  let { year = $bindable(), month = $bindable() } = $props();
</script>

<div class="date-picker">
  <label>
    Year
    <input type="number" bind:value={year} min="1970" max="2100" />
  </label>
  <label>
    Month
    <select bind:value={month}>
      {#each MONTHS as name, i}
        <option value={i + 1}>{name}</option>
      {/each}
    </select>
  </label>
</div>

<style>
  .date-picker {
    display: flex;
    gap: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.85rem;
    font-weight: 600;
    gap: 0.25rem;
  }

  input, select {
    padding: 0.4rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.95rem;
  }

  input[type="number"] {
    width: 5rem;
  }
</style>
