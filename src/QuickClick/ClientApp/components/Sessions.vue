<template>
    <div class="card my-3">
        <div class="card-header h5">
            Sessions {{ sessions.length ? '(' + sessions.length + ')' : '' }}
        </div>
        <table v-if="sessions.length" class="table table-responsive-md table-bordered table-striped table-sm">
            <thead class="thead-dark">
                <tr class="text-center">
                    <th>Started</th>
                    <th>Elapsed</th>
                    <th>Clicks</th>
                    <th>Clicks/s</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="session in sessions">
                    <tr>
                        <th class="text-monospace">
                            <span class="no-wrap">
                                {{ session.startedAt | date }}
                            </span>
                            {{ session.startedAt | time }}
                        </th>
                        <td class="text-monospace text-right">
                            {{ session.elapsed | elapsed }}
                        </td>
                        <td class="text-monospace text-right">
                            {{ session.clicks.length || 0 }}
                        </td>
                        <td class="text-monospace text-right">
                            {{ session.clicks.length / (session.elapsed / 1000) }}
                        </td>
                        <td>
                            <button @click="remove(session)" class="btn btn-danger btn-sm ml-2 px-1 py-0">Remove</button>

                            <button v-if="session.clicks.length" @click="session.isExpanded = !session.isExpanded"
                                    class="btn btn-link btn-sm">
                                {{ !session.isExpanded ? 'Details' : 'Hide' }}
                            </button>
                        </td>
                    </tr>
                    <tr v-if="session.isExpanded" class="bg-dark text-white">
                        <td colspan="5">
                            <span v-for="click in session.clicks" class="badge badge-pill badge-light m-1">
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
</template>

<script lang="ts" src="./Sessions"></script>