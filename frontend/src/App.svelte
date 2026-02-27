<script>
  import DatePicker from './components/DatePicker.svelte';
  import WeekStartPicker from './components/WeekStartPicker.svelte';
  import CalendarPreview from './components/CalendarPreview.svelte';
  import DownloadButton from './components/DownloadButton.svelte';

  const now = new Date();
  let year = $state(now.getFullYear());
  let month = $state(now.getMonth() + 1);
  let startDay = $state('sunday');
</script>

<main>
  <h1>CalGen</h1>
  <p class="subtitle">Generate printable monthly calendar PDFs</p>

  <div class="controls">
    <DatePicker bind:year bind:month />
    <WeekStartPicker bind:startDay />
    <DownloadButton {year} {month} {startDay} />
  </div>

  <CalendarPreview {year} {month} {startDay} />
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f5f5;
    color: #333;
  }

  main {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  h1 {
    margin: 0 0 0.25rem;
    font-size: 1.75rem;
  }

  .subtitle {
    margin: 0 0 1.5rem;
    color: #666;
  }

  .controls {
    display: flex;
    gap: 1.5rem;
    align-items: end;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }
</style>
