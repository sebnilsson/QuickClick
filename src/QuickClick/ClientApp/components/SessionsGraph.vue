<template>
    <div v-if="sessions.length > 1" class="card">
        <div class="card-status card-status-left bg-purple"></div>
        <div class="card-body px-1 py-0">
            <div id="chart-wrapper" ref="chartWrapper" style="height: 20rem;"></div>
        </div>
    </div>
</template>

<script lang="ts" src="./SessionsGraph"></script>