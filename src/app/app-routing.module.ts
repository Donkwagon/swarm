import { NgModule }                          from '@angular/core';
import { Routes, RouterModule }              from '@angular/router';

import { SiteComponent }                     from './site/site.component';
import { PostsComponent }                    from './site/posts/posts.component';
import { AuthorsComponent }                  from './site/authors/authors.component';
import { EntrancesComponent }                from './site/entrances/entrances.component';
import { LogsComponent }                     from './site/logs/logs.component';
import { SitemapComponent }                  from './site/sitemap/sitemap.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'site/:sitename', component: SiteComponent, children: [
      { path: '', redirectTo: 'site', pathMatch: 'full' },
      { path: 'sitemap', component: SitemapComponent},
      { path: 'posts', component: PostsComponent},
      { path: 'authors', component: AuthorsComponent},
      { path: 'entrances', component: EntrancesComponent},
      { path: 'logs', component: LogsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
