<script>
  const DAYS_SUNDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DAYS_MONDAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  let { year, month, startDay } = $props();

  let title = $derived(`${MONTH_NAMES[month - 1]} ${year}`);
  let dayNames = $derived(startDay === 'monday' ? DAYS_MONDAY : DAYS_SUNDAY);

  let grid = $derived.by(() => {
    const firstOfMonth = new Date(year, month - 1, 1);
    let firstDow = firstOfMonth.getDay();
    if (startDay === 'monday') {
      firstDow = (firstDow + 6) % 7;
    }
    const daysInMonth = new Date(year, month, 0).getDate();

    const cells = [];
    const totalCells = 42; // 6 rows x 7 cols
    for (let i = 0; i < totalCells; i++) {
      const day = i - firstDow + 1;
      cells.push(day >= 1 && day <= daysInMonth ? day : null);
    }
    // Split into rows
    const rows = [];
    for (let r = 0; r < 6; r++) {
      rows.push(cells.slice(r * 7, r * 7 + 7));
    }
    return rows;
  });
</script>

<div class="preview">
  <h2>{title}</h2>
  <table>
    <thead>
      <tr>
        {#each dayNames as d}
          <th>{d}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each grid as row}
        <tr>
          {#each row as cell}
            <td class:empty={cell === null}>
              {#if cell !== null}
                <span class="day-number">{cell}</span>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .preview {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }

  h2 {
    text-align: center;
    margin: 0 0 1rem;
    font-size: 1.25rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  th {
    padding: 0.5rem;
    text-align: center;
    font-size: 0.85rem;
    color: #666;
    border-bottom: 2px solid #ddd;
  }

  td {
    border: 1px solid #e0e0e0;
    height: 4.5rem;
    vertical-align: top;
    padding: 0.25rem 0.35rem;
  }

  td.empty {
    background: #fafafa;
  }

  .day-number {
    font-size: 0.85rem;
    font-weight: 600;
  }
</style>
