<template>
    <div>
        <div class="container">
            <h1 class="pt-3">QuickClick</h1>
            <p class="lead">
                Testing out your click-speed, for measuring your physical and mental baseline.
            </p>
        </div>
        
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-8 offset-lg-0 offset-md-2">
                    <Timer @start="timerStart" @done="timerDone" />
                </div>
                <div class="col-lg-8">
                    <Sessions :sessions="sessions" @remove="sessionRemove" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./App"></script>