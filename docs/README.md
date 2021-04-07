# 开始

<!-- <<< @/docs/.vuepress/config.js{12-20} -->

<ClientOnly>
  <HelloWorld />
</ClientOnly>

<span v-for="i in 3">{{ i }} </span>

<!-- {{ $page }} -->

::: v-pre
`{{ This will be displayed as-is }}`
:::

```js
{{ This will be displayed as-is }}
```
