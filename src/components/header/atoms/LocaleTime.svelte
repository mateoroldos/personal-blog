<script lang="ts">
  import { now, getLocalTimeZone } from "@internationalized/date";

  let mateoTimeZone = "America/Montevideo";

  let mateoTime = now(mateoTimeZone);
  let userTime = now(getLocalTimeZone());

  let mateoUTC = mateoTime.offset / 3.6e6;

  let hoursOfDifference = (userTime.offset - mateoTime.offset) / 3.6e6;

  let timesThatIAnswer = [9, 14, 19];
  let hoursToTimeThatIAnswer = timesThatIAnswer.map(
    time => time - mateoTime.hour
  );

  const getHoursToNextAnsweringTime = () => {
    const positiveNumbers = hoursToTimeThatIAnswer.filter(num => num > 0);

    if (positiveNumbers.length === 0) {
      return 24 - mateoTime.hour + timesThatIAnswer[0];
    }

    let hoursToAnswer = Math.min(...positiveNumbers);

    return hoursToAnswer;
  };

  const hoursToAnswer = getHoursToNextAnsweringTime();

  setInterval(() => {
    mateoTime = now(mateoTimeZone);
  }, 1000);
</script>

<div class="text-gray-600 flex flex-col items-end text-right text-sm">
  <span>I am in Montevideo, Uruguay</span>
  <div class="flex flex-row gap-2">
    <span>UTC{mateoUTC}</span>
    <span class="text-gray-900 font-semibold">
      <span>
        {mateoTime.hour}
      </span>
      <span>:</span>
      <span>
        {mateoTime.minute < 10 ? `0${mateoTime.minute}` : mateoTime.minute}
      </span>
    </span>
  </div>
  <hr class="border-b border-t-0 border-b-solid border-b-gray-600 w-12 my-3" />
  <span>
    {#if hoursOfDifference > 0}
      You are {hoursOfDifference}
      {hoursOfDifference === 1 ? `hour` : `hours`} ahead
    {:else if hoursOfDifference < 0}
      You are {hoursOfDifference}
      {hoursOfDifference === 1 ? `hour` : `hours`} behind
    {:else}
      We are on the same time zone,
    {/if}
  </span>
  <!-- <hr class="border-b border-t-0 border-b-solid border-b-gray-600 w-12 my-3" /> -->

  <span
    >I'll answer in around {hoursToAnswer}
    {hoursToAnswer === 1 ? `hour` : `hours`}
  </span>
</div>
