<script>
  let { year, month, startDay } = $props();

  let href = $derived(
    `/api/calendar?year=${year}&month=${month}&startDay=${startDay}`
  );
</script>

<a {href} class="download-btn" download>
  Download PDF
</a>

<style>
  .download-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.25rem;
    background: #2563eb;
    color: white;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    height: fit-content;
    transition: background 0.15s;
  }

  .download-btn:hover {
    background: #1d4ed8;
  }
</style>
