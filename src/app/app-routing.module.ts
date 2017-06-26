import { NgModule }                          from '@angular/core';
import { Routes, RouterModule }              from '@angular/router';

import { SiteComponent }                     from './site/site.component';
import { PostsComponent }                    from './site/posts/posts.component';
import { AuthorsComponent }                  from './site/authors/authors.component';
import { EntrancesComponent }                from './site/entrances/entrances.component';
import { LogsComponent }                     from './site/logs/logs.component';
import { BacklogsComponent }                 from './site/backlogs/backlogs.component';
import { SitemapComponent }                  from './site/sitemap/sitemap.component';
import { SocketComponent }                   from './socket/socket.component';
import { ClusterComponent }                   from './cluster/cluster.component';
import { SitesComponent }                    from './sites/sites.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'sites', component: SitesComponent},
  { path: 'cluster', component: ClusterComponent},
  { path: 'socket', component: SocketComponent},
  { path: 'site/:sitename', component: SiteComponent, children: [
      { path: '', redirectTo: 'site', pathMatch: 'full' },
      { path: 'sitemap', component: SitemapComponent},
      { path: 'posts', component: PostsComponent},
      { path: 'authors', component: AuthorsComponent},
      { path: 'entrances', component: EntrancesComponent},
      { path: 'backlogs', component: BacklogsComponent},
      { path: 'logs', component: LogsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
