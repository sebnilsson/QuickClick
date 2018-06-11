<template>
    <div>
        <div class="card">
            <div class="card-status card-status-left bg-blue"></div>
            <div class="card-header h5">
                Timer {{ isTimerRunning ? '(Running)' : '' }}
            </div>
            <div class="card-body">
                <div class="form-inline form-group">
                    <div class="input-group">
                        <span class="input-group-prepend">
                            <label for="timer-length" class="input-group-text">
                                <i class="fas fa-stopwatch"></i>
                            </label>
                        </span>

                        <input v-model="timerLength" :disabled="isTimerRunning"
                               id="timer-length" type="number" min="0" class="form-control text-right" list="defaulTtimerLengths" />

                        <datalist id="defaulTtimerLengths">
                            <option value="10" />
                            <option value="20" />
                            <option value="30" />
                            <option value="60" />
                            <option value="120" />
                        </datalist>

                        <span class="input-group-append">
                            <span class="input-group-text">
                                <small>
                                    Seconds
                                </small>
                            </span>
                        </span>
                    </div>
                </div>

                <div class="form-group text-center">
                    <button @click="start" :disabled="isTimerRunning || timerLength <= 0" class="btn btn-square btn-success">
                        <i class="fas fa-play"></i>
                        {{ !isTimerDone ? 'Start' : 'Restart' }}
                    </button>
                    <button @click="pause" :disabled="!isTimerRunning" class="btn btn-square btn-warning text-dark">
                        <i class="fas fa-pause"></i>
                        Pause
                    </button>
                    <button @click="stop" :disabled="timerElapsed <= 0 || isTimerRunning" class="btn btn-square btn-secondary">
                        <i class="fas fa-undo"></i>
                        Reset
                    </button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body p-3 text-center">
                        <div v-if="clicksPerSecond" class="text-right text-primary">
                            <i class="far fa-check-circle"></i>
                            {{ clicksPerSecond | twodigit }}
                        </div>
                        <div v-else>&nbsp;</div>

                        <div :class="{'bg-success text-white': isTimerDone, 'bg-warning': isTimerRunning && !isTimerDone, 'h1 m-0 text-monospace': true}">
                            {{ timerDisplay | singledigit }}
                        </div>
                        <div class="text-muted mb-4">
                            <i class="fas fa-stopwatch"></i>
                            Elapsed
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body p-3 text-center">
                        <div class="text-right">
                            &nbsp;
                        </div>
                        <div class="h1 m-0 text-monospace">
                            {{ currentSession.clicks.length }}
                        </div>
                        <div class="text-muted mb-4">
                            <i class="far fa-hand-pointer"></i>
                            Clicks
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-primary">
            <small>
                Press the <span class="text-monospace"><i class="fas fa-play"></i> Start </span>-button
                and click any button on the keyboard or mouse to measure your click-speed.
            </small>
        </div>
    </div>
</template>

<script lang="ts" src="./Timer"></script>