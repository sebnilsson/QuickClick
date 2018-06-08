<template>
    <div class="card my-3">
        <div class="card-header h5">
            Timer {{ isTimerRunning ? '(Running)' : '' }}
        </div>
        <div class="card-body">
            <div class="form-inline form-group">
                <label for="timer-length">Length</label>
                <div class="input-group">
                    <input v-model="timerLength" :disabled="isTimerRunning" id="timer-length" type="number" class="form-control ml-2" />
                    <span class="input-group-append">
                        <span class="input-group-text">
                            Seconds
                        </span>
                    </span>
                </div>
            </div>

            <div class="form-group text-center">
                <button @click="start" :disabled="isTimerRunning" class="btn btn-success">
                    {{ !isTimerDone ? 'Start' : 'Restart' }}
                </button>
                <button @click="pause" :disabled="!isTimerRunning" class="btn btn-warning">
                    Pause
                </button>
                <button @click="stop" :disabled="timerElapsed <= 0" class="btn btn-danger">
                    {{ !isTimerDone ? 'Stop' : 'Reset' }}
                </button>
            </div>
        </div>

        <div :class="{'bg-dark text-white': !isTimerDone && !isTimerRunning, 'bg-success text-white': isTimerDone, 'bg-warning': isTimerRunning && !isTimerDone, 'card-body text-center': true}">
            <div>
                <span v-if="!isTimerDone" class="text-monospace bg-light text-dark px-2 py-1">
                    {{ timerDisplay }}
                </span>
                <strong v-if="isTimerDone" class="bg-light text-dark px-2 py-1">
                    Done!
                </strong>
            </div>
            <div v-if="true || isTimerRunning || currentSession.clicks.length" class="mt-2">
                <strong>Clicks:</strong>
                <span class="text-monospace bg-light text-dark px-2 py-1">
                    {{ currentSession.clicks.length }}
                </span>
            </div>
        </div>

        <div class="card-footer bg-primary text-white">
            <span v-if="!isTimerRunning">
                Press the <span class="text-monospace">Start</span>-button and click any button on keyboard or mouse to measure your click-speed.
            </span>
            <span v-else>
                Click any button on keyboard or mouse to measure your click-speed.
            </span>
        </div>
    </div>
</template>

<script lang="ts" src="./Timer"></script>