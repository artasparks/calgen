<script>
  let { startDay = $bindable() } = $props();
</script>

<fieldset>
  <legend>Week starts on</legend>
  <label>
    <input type="radio" bind:group={startDay} value="sunday" />
    Sunday
  </label>
  <label>
    <input type="radio" bind:group={startDay} value="monday" />
    Monday
  </label>
</fieldset>

<style>
  fieldset {
    border: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  legend {
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.95rem;
    cursor: pointer;
  }
</style>
