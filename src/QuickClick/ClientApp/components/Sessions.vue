<template>
    <div>
        <div class="card p-3">
            <div class="d-flex align-items-center">
                <span class="stamp stamp-md bg-purple mr-3">
                    <i class="fas fa-list"></i>
                </span>
                <div>
                    <h4 class="m-0">
                        {{ sessions.length ? sessions.length : '' }}
                        <small>{{ sessions.length === 1 ? 'Session' : 'Sessions' }}</small>
                    </h4>
                </div>
            </div>
        </div>

        <SessionsGraph :sessions="sessions" />

        <div class="card">
            <div class="card-status bg-purple"></div>
            <table v-if="sessions.length" class="table table-responsive-md table-bordered table-striped table-sm text-monospace mb-0">
                <thead class="thead-dark">
                    <tr class="text-center">
                        <th>
                            <i class="far fa-calendar-alt"></i>
                            Started
                        </th>
                        <th>
                            <i class="fas fa-stopwatch"></i>
                            Elapsed
                        </th>
                        <th>
                            <i class="far fa-hand-pointer"></i>
                            Clicks
                        </th>
                        <th>
                            <i class="far fa-check-circle"></i>
                            Clicks/s
                        </th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="session in sessions">
                        <tr>
                            <th>
                                <span class="no-wrap">
                                    {{ session.startedAt | date }}
                                </span>
                                {{ session.startedAt | time }}
                            </th>
                            <td class="text-right">
                                {{ session.elapsed | elapsed }}
                            </td>
                            <td class="text-right">
                                {{ session.clicks.length || 0 }}
                            </td>
                            <td class="text-right">
                                {{ session.clicks.length / (session.elapsed / 1000) | twodigit }}
                            </td>
                            <td>
                                <button @click="remove(session)" class="btn btn-link btn-sm">
                                    <i class="far fa-trash-alt text-danger" title="Remove"></i>
                                </button>

                                <button v-if="session.clicks.length" @click="session.isExpanded = !session.isExpanded"
                                        class="btn btn-link btn-sm">
                                    <i :class="{ 'fas fa-chevron-down': !session.isExpanded, 'fas fa-chevron-up': session.isExpanded }" title="Details"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="session.isExpanded" class="bg-dark text-white">
                            <td colspan="5">
                                <span v-for="click in session.clicks" class="badge badge-default m-1">
                                    {{ click | timems }}
                                </span>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div v-else class="card-body">
                <em>No sessions</em>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./Sessions"></script>